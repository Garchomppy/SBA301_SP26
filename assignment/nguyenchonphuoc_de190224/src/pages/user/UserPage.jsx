// src/pages/Users.jsx
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import UserTable from "../../features/users/components/UserTable.jsx";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../features/api/userService/userService.js";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Staff",
    status: 1,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      if (Array.isArray(data)) {
        // Map backend entity to frontend view model
        const mappedUsers = data.map((u) => ({
          id: u.accountId,
          username: u.accountName,
          email: u.accountEmail,
          role: u.accountRole === 1 ? "Admin" : "Staff",
          status: u.isActive ? 1 : 0,
        }));
        setUsers(mappedUsers);
      } else {
        setUsers([]);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.username || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreate = async () => {
    try {
      const payload = {
        accountName: formData.username,
        accountEmail: formData.email,
        accountPassword: "123", // Default password
        accountRole: formData.role === "Admin" ? 1 : 0,
        isActive: formData.status === 1,
      };

      await createUser(payload);
      toast.success("Thêm tài khoản thành công!");
      fetchUsers();
      resetModal();
    } catch (error) {
      toast.error("Lỗi khi thêm tài khoản");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        accountName: formData.username,
        accountEmail: formData.email,
        accountRole: formData.role === "Admin" ? 1 : 0,
        isActive: formData.status === 1,
      };
      await updateUser(editingUser.id, payload);
      toast.success("Cập nhật tài khoản thành công!");
      fetchUsers();
      resetModal();
    } catch (error) {
      toast.error("Lỗi khi cập nhật tài khoản");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("Xóa tài khoản thành công!");
      fetchUsers();
    } catch (error) {
      toast.error("Lỗi khi xóa tài khoản");
    }
    setShowConfirm(false);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      role: "Staff",
      status: 1,
    });
  };

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>
            Quản lý Tài khoản{" "}
            <small className="text-muted">(CRUD + Search)</small>
          </h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowModal(true)}>
            <PlusCircle className="me-2" /> Thêm tài khoản
          </Button>
        </Col>
      </Row>

      <Form.Group className="mb-4" style={{ maxWidth: 450 }}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên đăng nhập..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Text className="text-muted">
          <Search className="me-1" /> Hiển thị {filteredUsers.length} /{" "}
          {users.length} tài khoản
        </Form.Text>
      </Form.Group>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Đang tải danh sách...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center my-5 py-5 bg-light rounded-4">
          <p className="text-muted fs-5 mb-0">Không tìm thấy tài khoản nào.</p>
        </div>
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={(id) => {
            const user = users.find((u) => u.id === id);
            setEditingUser(user);
            setFormData({
              username: user.username,
              email: user.email,
              role: user.role,
              status: user.status,
            });
            setShowModal(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setShowConfirm(true);
          }}
        />
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? "Sửa Tài khoản" : "Thêm Tài khoản"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={editingUser} // Không cho sửa username
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="example@funews.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Check
                type="switch"
                label={formData.status === 1 ? "Hoạt động" : "Khóa"}
                checked={formData.status === 1}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked ? 1 : 0 })
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
            onClick={editingUser ? handleUpdate : handleCreate}
            disabled={!formData.username.trim()}
          >
            {editingUser ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog
        show={showConfirm}
        title="Xác nhận xóa tài khoản"
        message="Bạn có chắc chắn muốn xóa tài khoản này?"
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setShowConfirm(false)}
      />
    </Container>
  );
}
