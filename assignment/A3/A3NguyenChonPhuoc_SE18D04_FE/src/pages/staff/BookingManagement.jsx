import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "../../components/Navigation";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../stores/api";
import "./Staff.css";

const BookingManagementPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    bookingId: null,
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
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, statusFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/bookings");
      setBookings(res.data || []);
      setError("");
    } catch (err) {
      setError(
        "Lỗi tải danh sách booking: " +
          (err.response?.data?.error || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (statusFilter === "ALL") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((b) => b.status === statusFilter));
    }
  };

  const handleStatusChange = async () => {
    try {
      await api.put(`/admin/bookings/${selectedBooking.id}/status`, {
        status: newStatus,
      });

      setMessage("Cập nhật trạng thái booking thành công!");
      setShowDetails(false);
      setSelectedBooking(null);
      fetchBookings();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        "Lỗi cập nhật trạng thái: " +
          (err.response?.data?.error || err.message),
      );
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, bookingId: id });
  };

  const handleConfirmDelete = async () => {
    const id = deleteModal.bookingId;
    if (!id) return;

    try {
      await api.delete(`/admin/bookings/${id}`);
      setMessage("Hủy booking thành công!");
      fetchBookings();
      setDeleteModal({ isOpen: false, bookingId: null });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        "Lỗi hủy booking: " + (err.response?.data?.error || err.message),
      );
      setDeleteModal({ isOpen: false, bookingId: null });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "badge alert-warning";
      case "CONFIRMED":
        return "badge alert-success";
      case "COMPLETED":
        return "badge alert-info";
      case "CANCELLED":
        return "badge alert-error";
      default:
        return "badge";
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      PENDING: "Chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      COMPLETED: "Hoàn tất",
      CANCELLED: "Đã hủy",
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
            <h1 className="staff-title">Quản lý Booking</h1>
            <p className="staff-subtitle">
              Theo dõi và cập nhật trạng thái đặt phòng
            </p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="filters-bar">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`filter-btn ${statusFilter === "ALL" ? "active" : ""}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter("PENDING")}
            className={`filter-btn ${statusFilter === "PENDING" ? "active" : ""}`}
          >
            Chờ xác nhận
          </button>
          <button
            onClick={() => setStatusFilter("CONFIRMED")}
            className={`filter-btn ${statusFilter === "CONFIRMED" ? "active" : ""}`}
          >
            Đã xác nhận
          </button>
          <button
            onClick={() => setStatusFilter("COMPLETED")}
            className={`filter-btn ${statusFilter === "COMPLETED" ? "active" : ""}`}
          >
            Hoàn tất
          </button>
          <button
            onClick={() => setStatusFilter("CANCELLED")}
            className={`filter-btn ${statusFilter === "CANCELLED" ? "active" : ""}`}
          >
            Đã hủy
          </button>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th style={{ textAlign: "right" }}>Tổng tiền</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: "center" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    Không có booking nào
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer?.email || "N/A"}</td>
                    <td>
                      {new Date(booking.checkInDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </td>
                    <td>
                      {new Date(booking.checkOutDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {parseFloat(booking.totalAmount).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(booking.status)}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setNewStatus(booking.status);
                          setShowDetails(true);
                        }}
                        className="btn-info"
                      >
                        Chi tiết
                      </button>
                      {booking.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleDeleteClick(booking.id)}
                          className="btn-danger"
                        >
                          Hủy
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showDetails && selectedBooking && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "12px",
                maxWidth: "500px",
                width: "90%",
                boxShadow:
                  "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "20px", color: "#0f172a" }}>
                  Chi tiết Booking #{selectedBooking.id}
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: "16px", color: "#475569" }}>
                <strong style={{ color: "#334155" }}>Khách hàng:</strong>{" "}
                {selectedBooking.customer?.email}
              </div>
              <div style={{ marginBottom: "16px", color: "#475569" }}>
                <strong style={{ color: "#334155" }}>Check-in:</strong>{" "}
                {new Date(selectedBooking.checkInDate).toLocaleDateString(
                  "vi-VN",
                )}
              </div>
              <div style={{ marginBottom: "16px", color: "#475569" }}>
                <strong style={{ color: "#334155" }}>Check-out:</strong>{" "}
                {new Date(selectedBooking.checkOutDate).toLocaleDateString(
                  "vi-VN",
                )}
              </div>
              <div style={{ marginBottom: "24px", color: "#475569" }}>
                <strong style={{ color: "#334155" }}>Tổng tiền:</strong>{" "}
                {parseFloat(selectedBooking.totalAmount).toLocaleString(
                  "vi-VN",
                )}{" "}
                VNĐ
              </div>

              <div className="form-group">
                <label>Cập nhật trạng thái:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="PENDING">Chờ xác nhận</option>
                  <option value="CONFIRMED">Đã xác nhận</option>
                  <option value="COMPLETED">Hoàn tất</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  onClick={handleStatusChange}
                  className="btn-success"
                  style={{ flex: 1 }}
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Xác nhận hủy booking"
        message="Bạn có chắc chắn muốn hủy booking này? Khách hàng sẽ nhận được thông báo về việc hủy."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, bookingId: null })}
      />
    </>
  );
};

export default BookingManagementPage;
