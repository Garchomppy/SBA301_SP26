import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import api from "../../stores/api";

const BookingHistoryPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchBookingHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/my-history");
      setBookings(res.data || []);
      setError("");
    } catch (err) {
      setError(
        "Lỗi tải lịch sử booking: " +
          (err.response?.data?.error || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBookingHistory();
    }
  }, [token, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy booking này?")) return;

    try {
      await api.delete(`/bookings/${bookingId}`);
      setMessage("Hủy booking thành công!");
      fetchBookingHistory();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(
        "Lỗi hủy booking: " + (err.response?.data?.error || err.message),
      );
    }
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      PENDING: { background: "#ffc107", color: "black" },
      CONFIRMED: { background: "#28a745", color: "white" },
      COMPLETED: { background: "#17a2b8", color: "white" },
      CANCELLED: { background: "#dc3545", color: "white" },
    };
    return styles[status] || { background: "#6c757d", color: "white" };
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

  if (!token) return null;

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Đang tải...</div>
    );
  }

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
        <h1>Lịch sử đặt phòng</h1>

        {error && (
          <div
            style={{
              color: "#dc3545",
              marginBottom: "15px",
              padding: "10px",
              background: "#fff5f5",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        {!Array.isArray(bookings) || bookings.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "18px", color: "#6c757d" }}>
              Bạn chưa có booking nào.
            </p>
            <button
              onClick={() => navigate("/bookings/create")}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Đặt phòng ngay
            </button>
          </div>
        ) : (
          <div>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Booking #{booking.id}</h3>
                  <span
                    style={{
                      ...getStatusBadgeStyle(booking.status),
                      padding: "5px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
                  </div>
                  <div>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
                  </div>
                  <div>
                    <strong>Tổng tiền:</strong>{" "}
                    {parseFloat(booking.totalAmount).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </div>
                  <div>
                    <strong>Ngày đặt:</strong>{" "}
                    {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowDetails(true);
                    }}
                    style={{
                      padding: "8px 16px",
                      background: "#17a2b8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Xem chi tiết
                  </button>

                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      style={{
                        padding: "8px 16px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Hủy booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showDetails && selectedBooking && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "90%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2>Chi tiết Booking #{selectedBooking.id}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Trạng thái:</strong>{" "}
                {getStatusText(selectedBooking.status)}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <strong>Check-in:</strong>{" "}
                {new Date(selectedBooking.checkInDate).toLocaleDateString(
                  "vi-VN",
                )}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <strong>Check-out:</strong>{" "}
                {new Date(selectedBooking.checkOutDate).toLocaleDateString(
                  "vi-VN",
                )}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <strong>Tổng tiền:</strong>{" "}
                {parseFloat(selectedBooking.totalAmount).toLocaleString(
                  "vi-VN",
                )}{" "}
                VNĐ
              </div>

              {selectedBooking.details &&
                selectedBooking.details.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Phòng:</strong>
                    <ul>
                      {selectedBooking.details.map((detail) => (
                        <li key={detail.id}>
                          Phòng {detail.room?.roomNumber} -{" "}
                          {detail.room?.roomType?.typeName} (
                          {parseFloat(detail.priceAtBooking).toLocaleString(
                            "vi-VN",
                          )}{" "}
                          VNĐ/đêm)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <button
                onClick={() => setShowDetails(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingHistoryPage;
