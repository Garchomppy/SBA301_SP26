import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "../../components/Navigation";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../stores/api";
import "./Staff.css";

const RoomManagementPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    roomId: null,
  });
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomTypeId: "",
    status: "AVAILABLE",
    note: "",
  });

  if (!token) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      const isStaff = decoded.role === "ROLE_STAFF";
      if (!isStaff) {
        navigate("/home");
      }
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchRoomsAndTypes();
  }, []);

  const fetchRoomsAndTypes = async () => {
    try {
      setLoading(true);
      const [roomsRes, typesRes] = await Promise.all([
        api.get("/rooms"),
        api.get("/room-types"),
      ]);
      setRooms(roomsRes.data || []);
      setRoomTypes(typesRes.data || []);
      setError("");
    } catch (err) {
      setError(
        "Lỗi tải dữ liệu: " + (err.response?.data?.error || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/rooms/${editingId}`, formData);
        setMessage("Cập nhật phòng thành công!");
      } else {
        await api.post("/admin/rooms", formData);
        setMessage("Tạo phòng thành công!");
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        roomNumber: "",
        roomTypeId: "",
        status: "AVAILABLE",
        note: "",
      });
      fetchRoomsAndTypes();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        "Lỗi lưu dữ liệu: " + (err.response?.data?.error || err.message),
      );
    }
  };

  const handleEdit = (room) => {
    const matchedType = roomTypes.find(
      (t) => t.name === (room.roomTypeName || room.roomType?.name),
    );
    setFormData({
      roomNumber: room.roomNumber,
      roomTypeId: matchedType ? matchedType.id : "",
      status: room.status,
      note: room.note || "",
    });
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, roomId: id });
  };

  const handleConfirmDelete = async () => {
    const id = deleteModal.roomId;
    if (!id) return;

    try {
      const res = await api.delete(`/admin/rooms/${id}`);
      setMessage(res.data?.message || "Thao tác thành công!");
      fetchRoomsAndTypes();
      setDeleteModal({ isOpen: false, roomId: null });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Lỗi xóa phòng: " + (err.response?.data?.error || err.message));
      setDeleteModal({ isOpen: false, roomId: null });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      roomNumber: "",
      roomTypeId: "",
      status: "AVAILABLE",
      note: "",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "badge alert-success";
      case "UNAVAILABLE":
        return "badge alert-error";
      case "MAINTENANCE":
        return "badge alert-warning";
      default:
        return "badge";
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      AVAILABLE: "Còn phòng",
      UNAVAILABLE: "Hết phòng",
      MAINTENANCE: "Bảo trì",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Đang tải...</div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="staff-container">
        <div className="staff-header">
          <div>
            <h1 className="staff-title">Quản lý Phòng</h1>
            <p className="staff-subtitle">
              Tạo, chỉnh sửa và quản lý danh sách phòng
            </p>
          </div>
          {!showForm && (
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Thêm phòng
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {showForm && (
          <form className="form-container" onSubmit={handleSubmit}>
            <h3 className="form-title">
              {editingId ? "Chỉnh sửa phòng" : "Tạo phòng mới"}
            </h3>

            <div className="form-group">
              <label>Số phòng:</label>
              <input
                type="text"
                name="roomNumber"
                className="form-control"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Loại phòng:</label>
              <select
                name="roomTypeId"
                className="form-control"
                value={formData.roomTypeId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  -- Chọn loại phòng --
                </option>
                {roomTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} (
                    {parseFloat(type.pricePerNight).toLocaleString("vi-VN")}{" "}
                    VNĐ)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Trạng thái:</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="AVAILABLE">Còn phòng</option>
                <option value="UNAVAILABLE">Hết phòng</option>
                <option value="MAINTENANCE">Bảo trì</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ghi chú:</label>
              <textarea
                name="note"
                className="form-control"
                value={formData.note}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-success" style={{ flex: 1 }}>
                {editingId ? "Cập nhật" : "Tạo mới"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                style={{ flex: 1 }}
              >
                Hủy
              </button>
            </div>
          </form>
        )}

        <div className="grid-container">
          {rooms.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "20px",
                color: "#666",
              }}
            >
              Không có phòng nào
            </div>
          ) : (
            rooms.map((room) => (
              <div key={room.id} className="item-card">
                <div className="item-card-header">
                  <h4 className="item-card-title">Phòng {room.roomNumber}</h4>
                  <span className={getStatusBadgeClass(room.status)}>
                    {getStatusText(room.status)}
                  </span>
                </div>

                <div className="item-card-body">
                  <div className="item-detail">
                    <strong>Loại:</strong>{" "}
                    {room.roomTypeName || room.roomType?.name || "N/A"}
                  </div>
                  <div className="item-detail">
                    <strong>Giá:</strong>{" "}
                    {parseFloat(
                      room.pricePerNight || room.roomType?.pricePerNight || 0,
                    ).toLocaleString("vi-VN")}{" "}
                    VNĐ/đêm
                  </div>
                  {room.note && (
                    <div className="item-detail">
                      <strong>Ghi chú:</strong> {room.note}
                    </div>
                  )}
                </div>

                <div className="item-card-actions">
                  <button className="btn-info" onClick={() => handleEdit(room)}>
                    Sửa
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteClick(room.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận xóa phòng"
        message="Bạn có chắc chắn muốn xóa phòng này? Thao tác này không thể hoàn tác."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, roomId: null })}
      />
    </>
  );
};

export default RoomManagementPage;
