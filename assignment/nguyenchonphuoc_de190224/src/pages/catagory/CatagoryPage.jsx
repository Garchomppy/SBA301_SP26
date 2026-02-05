// src/features/category/CategoryPage.jsx
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../features/api/categoryService/categoryService.js";
import CategoryTable from "../../features/category/components/CatagoryTable.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    parentCategoryId: 0,
    isActive: 1, // Default active
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      console.log(data);
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreate = async () => {
    try {
      const payload = {
        categoryName: formData.categoryName,
        categoryDescription: formData.categoryDescription,
        isActive: formData.isActive === 1,
        // Backend expects parentCategory as object if it exists
        parentCategory:
          formData.parentCategoryId !== 0
            ? { categoryId: Number(formData.parentCategoryId) }
            : null,
      };
      await createCategory(payload);
      toast.success("Thêm danh mục thành công!");
      fetchCategories();
      resetModal();
    } catch (error) {
      toast.error("Lỗi khi thêm danh mục");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        categoryName: formData.categoryName,
        categoryDescription: formData.categoryDescription,
        isActive: formData.isActive === 1,
        parentCategory:
          formData.parentCategoryId !== 0
            ? { categoryId: Number(formData.parentCategoryId) }
            : null,
      };
      await updateCategory(editingCategory.categoryId, payload);
      toast.success("Cập nhật danh mục thành công!");
      fetchCategories();
      resetModal();
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh mục");
    }
  };

  const handleDelete = async (id) => {
    // Kiểm tra xem có danh mục con không
    const hasChildren = categories.some((c) => c.parentCategoryId === id);
    if (hasChildren) {
      toast.error("Không thể xóa! Danh mục này đang có danh mục con.");
      setShowConfirm(false);
      return;
    }

    try {
      await deleteCategory(id);
      toast.success("Xóa danh mục thành công!");
      fetchCategories();
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục");
    }
    setShowConfirm(false);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      categoryName: "",
      categoryDescription: "",
      parentCategoryId: 0,
      isActive: 1,
    });
  };

  // Lọc danh mục cha (loại bỏ chính nó khi sửa)
  const getParentOptions = () => {
    if (!editingCategory) return categories;
    return categories.filter(
      (cat) => cat.categoryId !== editingCategory.categoryId,
    );
  };

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Quản lý Danh mục</h4>
          <Button variant="light" onClick={() => setShowModal(true)}>
            <PlusCircle className="me-2" /> Thêm danh mục
          </Button>
        </Card.Header>

        <Card.Body>
          {/* Search */}
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <Form.Control
                placeholder="Tìm theo tên danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          {/* Table */}
          <div className="table-responsive">
            <CategoryTable
              categories={filteredCategories}
              allCategories={categories} // truyền toàn bộ để hiển thị tên cha
              onEdit={(id) => {
                const cat = categories.find((c) => c.categoryId === id);
                setEditingCategory(cat);
                setFormData({
                  categoryName: cat.categoryName,
                  categoryDescription: cat.categoryDescription || "",
                  parentCategoryId: cat.parentCategory
                    ? cat.parentCategory.categoryId
                    : 0,
                  isActive: cat.isActive === true ? 1 : 0,
                });
                setShowModal(true);
              }}
              onDelete={(id) => {
                setDeleteId(id);
                setShowConfirm(true);
              }}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                placeholder="Ví dụ: Hội thảo, Thông báo..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.categoryDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryDescription: e.target.value,
                  })
                }
                placeholder="Mô tả ngắn về danh mục này"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                value={formData.parentCategoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parentCategoryId: Number(e.target.value),
                  })
                }
              >
                <option value={0}>-- Không có --</option>
                {getParentOptions().map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Check
                type="switch"
                label={
                  formData.isActive === 1 ? "Hoạt động" : "Không hoạt động"
                }
                checked={formData.isActive === 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetModal}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={editingCategory ? handleUpdate : handleCreate}
            disabled={!formData.categoryName.trim()}
          >
            {editingCategory ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm xóa */}
      <ConfirmDialog
        show={showConfirm}
        title="Xác nhận xóa danh mục"
        message="Bạn có chắc chắn muốn xóa danh mục này? (Không thể xóa nếu còn danh mục con)"
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setShowConfirm(false)}
      />
    </Container>
  );
}
