// src/pages/admin/DashboardOrchids.jsx
import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Alert,
  Pagination,
  Card,
  Badge,
} from "react-bootstrap";
import { Pencil, Trash, PlusLg } from "react-bootstrap-icons";
import { orchidAPI } from "../api/orchids";
import FilterSort from "../../components/FilterSort";
import ConfirmModal from "../../components/ConfirmModal";

export default function DashboardOrchids() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOrchid, setCurrentOrchid] = useState(null);
  const [formData, setFormData] = useState({
    orchidName: "",
    description: "",
    category: "",
    price: 0,
    image: "",
    isSpecial: false,
  });

  // Filter, Sort & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const response = await orchidAPI.getAll();
      setOrchids(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orchids:", err);
      setError("Không thể tải danh sách orchids. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // CRUD
  const handleCreate = async () => {
    try {
      const maxId =
        orchids.length > 0 ? Math.max(...orchids.map((o) => Number(o.id))) : 0;
      const newId = (maxId + 1).toString();
      const newOrchid = { ...formData, id: newId };
      const response = await orchidAPI.create(newOrchid);
      setOrchids([...orchids, response.data]);
      handleCloseModal();
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      const response = await orchidAPI.update(currentOrchid.id, formData);
      setOrchids(
        orchids.map((o) => (o.id === currentOrchid.id ? response.data : o)),
      );
      handleCloseModal();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await orchidAPI.delete(deleteId);
      setOrchids(orchids.filter((o) => o.id !== deleteId));
    } catch (err) {
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  // Modal handlers
  const handleShowCreate = () => {
    setIsEditMode(false);
    setFormData({
      orchidName: "",
      description: "",
      category: "",
      price: 0,
      image: "",
      isSpecial: false,
    });
    setShowModal(true);
  };

  const handleShowEdit = (orchid) => {
    setIsEditMode(true);
    setCurrentOrchid(orchid);
    setFormData({ ...orchid });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrchid(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.orchidName || !formData.category || !formData.image) {
      return;
    }
    if (isEditMode) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  // Filtered & Sorted & Paginated
  const filteredAndSortedOrchids = useMemo(() => {
    let result = orchids;

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((o) => o.orchidName.toLowerCase().includes(query));
    }

    // Filter category
    if (selectedCategory) {
      result = result.filter((o) => o.category === selectedCategory);
    }

    // Sort
    return [...result].sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.orchidName.localeCompare(b.orchidName);
        case "desc":
          return b.orchidName.localeCompare(a.orchidName);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [orchids, searchQuery, selectedCategory, sortOrder]);

  const paginatedOrchids = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrchids.slice(start, start + itemsPerPage);
  }, [filteredAndSortedOrchids, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedOrchids.length / itemsPerPage);

  const categories = useMemo(
    () => [...new Set(orchids.map((o) => o.category))],
    [orchids],
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải danh sách orchids...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        {error}
      </Alert>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold mb-0">Quản lý Orchid Collection</h2>
          <p className="text-muted">
            Tổng số: {filteredAndSortedOrchids.length} sản phẩm
          </p>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleShowCreate}>
            <PlusLg className="me-2" /> Thêm Orchid Mới
          </Button>
        </Col>
      </Row>

      {/* Filter & Sort */}
      <FilterSort
        categories={categories}
        onClearAll={() => {
          setSearchQuery("");
          setSelectedCategory("");
          setSortOrder("default");
          setCurrentPage(1);
        }}
        onFilterChange={(val) => {
          setSelectedCategory(val);
          setCurrentPage(1);
        }}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onSortChange={(val) => setSortOrder(val)}
        searchQuery={searchQuery}
      />

      {/* Table */}
      <Card className="shadow border-0 rounded-4 overflow-hidden mt-4">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên Orchid</th>
              <th>Danh mục</th>
              <th>Giá ($)</th>
              <th>Đặc biệt</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrchids.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-5 text-muted">
                  Không tìm thấy orchid nào phù hợp
                </td>
              </tr>
            ) : (
              paginatedOrchids.map((orchid) => (
                <tr key={orchid.id}>
                  <td className="fw-medium text-muted">{orchid.id}</td>
                  <td style={{ width: "80px" }}>
                    <img
                      src={orchid.image}
                      alt={orchid.orchidName}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/60?text=Orchid")
                      }
                    />
                  </td>
                  <td className="fw-medium">{orchid.orchidName}</td>
                  <td>
                    <Badge bg="info">{orchid.category}</Badge>
                  </td>
                  <td>${orchid.price.toLocaleString()}</td>
                  <td>
                    <Badge bg={orchid.isSpecial ? "success" : "secondary"}>
                      {orchid.isSpecial ? "Special" : "Normal"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowEdit(orchid)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(orchid.id)}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Modal Create/Edit */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Chỉnh sửa Orchid" : "Thêm Orchid Mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Orchid *</Form.Label>
                  <Form.Control
                    required
                    value={formData.orchidName}
                    onChange={(e) =>
                      setFormData({ ...formData, orchidName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Danh mục </Form.Label>
                  <Form.Select
                    required
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Chọn danh mục...
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá ($)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>URL Ảnh *</Form.Label>
                  <Form.Control
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Check
                  type="switch"
                  label="Đánh dấu là bộ sưu tập đặc biệt"
                  checked={formData.isSpecial}
                  onChange={(e) =>
                    setFormData({ ...formData, isSpecial: e.target.checked })
                  }
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button
                variant={isEditMode ? "success" : "primary"}
                type="submit"
              >
                {isEditMode ? "Lưu thay đổi" : "Thêm mới"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Xác nhận xóa"
        body="Bạn có chắc chắn muốn xóa orchid này không? Hành động này không thể hoàn tác."
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
