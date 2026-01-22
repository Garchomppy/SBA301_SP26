import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Orchid from "./Orchids";
import FilterSort from "../../components/FilterSort";
import { useMemo, useState } from "react";

export default function ListofOrchid({
  orchid: searchedOrchids,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [formData, setFormData] = useState({
    orchidName: "",
    description: "",
    category: "",
    isSpecial: false,
    image: "",
    price: 0,
  });

  const categories = useMemo(() => {
    return [...new Set(searchedOrchids.map((item) => item.category))];
  }, [searchedOrchids]);

  const displayOrchids = useMemo(() => {
    // Ưu tiên danh sách từ props (kết quả search), nếu không có dùng danh sách gốc
    let result = searchedOrchids;

    // Tiến hành Lọc (Filter)
    if (selectedCategory !== "") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Tiến hành Sắp xếp (Sort) - tạo bản sao để tránh đột biến mảng gốc
    const sortedResult = [...result].sort((a, b) => {
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

    return sortedResult;
  }, [searchedOrchids, selectedCategory, sortOrder]);

  const handleCreate = () => {
    setFormData({
      orchidName: "",
      description: "",
      category: "",
      isSpecial: false,
      image: "",
      price: 0,
    });
    setShowCreateModal(true);
  };

  const handleEdit = (id) => {
    const orchid = searchedOrchids.find((o) => o.id === id);
    setEditingOrchid(orchid);
    setFormData({ ...orchid });
    setShowEditModal(true);
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    onCreate({ ...formData, id: Date.now().toString() });
    setShowCreateModal(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onUpdate(editingOrchid.id, formData);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const closeAllModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({
      orchidName: "",
      description: "",
      category: "",
      image: "",
      price: 0,
      isSpecial: false,
    });
  };

  return (
    <Container className="py-5">
      <header className="text-center mb-5">
        <span
          className="text-uppercase tracking-widest text-info fw-bold mb-2 d-block"
          style={{ fontSize: "0.9rem" }}
        >
          Premium Selection
        </span>
        <h1 className="display-5 fw-bold mb-3" style={{ color: "#1a2a3a" }}>
          Orchid Collection
        </h1>
        <div
          className="mx-auto"
          style={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(to right, #17a2b8, #007bff)",
            borderRadius: "2px",
          }}
        />
      </header>

      <div className="toolbar-container bg-white p-3 mb-4 rounded-4 shadow-sm border-0 d-flex align-items-center">
        <Row className="w-100 g-3 align-items-center">
          {/* Phần bên trái: Các bộ lọc */}
          <Col xs={12} md={8} lg={9}>
            <div className="d-flex align-items-center ">
              <FilterSort
                categories={categories}
                onFilterChange={setSelectedCategory}
                onSortChange={setSortOrder}
              />
            </div>
          </Col>

          {/* Phần bên phải: Nút thêm mới */}
          <Col xs={12} md={4} lg={3} className="text-md-end">
            <Button
              variant="info"
              className="add-btn text-white px-4 py-2 fw-bold rounded-pill shadow-sm border-0 w-100 w-md-auto"
              onClick={handleCreate}
            >
              <i className="bi bi-plus-circle-fill me-2"></i>
              <span>Add Orchid</span>
            </Button>
          </Col>
        </Row>
      </div>

      <Row className="mt-4">
        {displayOrchids.length > 0 ? (
          displayOrchids.map((item) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              key={item.id}
              className="mb-4 d-flex justify-content-center"
            >
              <Orchid {...item} onEdit={handleEdit} onDelete={onDelete} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4 className="text-muted">Không tìm thấy sản phẩm nào phù hợp.</h4>
          </Col>
        )}
      </Row>

      <Modal
        show={showCreateModal || showEditModal}
        onHide={closeAllModals}
        centered
        size="lg"
        className="custom-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">
            {showCreateModal ? (
              <>
                <i className="bi bi-plus-circle me-2"></i>Add New Orchid
              </>
            ) : (
              <>
                <i className="bi bi-pencil-square me-2"></i>Update Orchid
              </>
            )}
          </Modal.Title>
        </Modal.Header>

        <Form
          onSubmit={showCreateModal ? handleSubmitCreate : handleSubmitEdit}
        >
          <Modal.Body className="px-4 py-3">
            <Row>
              {/* Cột trái: Tên và Danh mục */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Orchid Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="orchidName"
                    placeholder="e.g. Vanda Coerulea"
                    value={formData.orchidName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    placeholder="e.g. Dendrobium"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Cột phải: Giá và Ảnh */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Check
                  type="switch"
                  id="special-switch"
                  label="Mark as Special Collection"
                  name="isSpecial"
                  className="fw-bold text-success"
                  checked={formData.isSpecial}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="border-0 pt-0 px-4 pb-4">
            <Button
              variant="light"
              className="px-4 rounded-pill"
              onClick={closeAllModals}
            >
              Cancel
            </Button>
            <Button
              variant={showCreateModal ? "primary" : "success"}
              type="submit"
              className="px-4 rounded-pill shadow-sm"
            >
              {showCreateModal ? "Create Orchid" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
