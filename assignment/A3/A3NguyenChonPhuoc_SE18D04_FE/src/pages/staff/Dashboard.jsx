import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "../../components/Navigation";
import api from "../../stores/api";
import "./Staff.css";

const StaffDashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!token) {
    navigate("/login");
    return null;
  }

  // redirect customers away from staff area
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
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/bookings/stats/overview");
      setStats(res.data);
      setError("");
    } catch (err) {
      setError(
        "Lỗi tải thống kê: " + (err.response?.data?.error || err.message),
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <h1 className="staff-title">Dashboard Nhân viên</h1>
            <p className="staff-subtitle">Hệ thống quản lý khách sạn</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {stats && (
          <div className="stats-grid">
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #3b82f6" }}
            >
              <h3>Tổng Booking</h3>
              <p style={{ color: "#3b82f6" }}>{stats.totalBookings}</p>
            </div>
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #f59e0b" }}
            >
              <h3>Chờ xác nhận</h3>
              <p style={{ color: "#f59e0b" }}>{stats.pending}</p>
            </div>
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #10b981" }}
            >
              <h3>Đã xác nhận</h3>
              <p style={{ color: "#10b981" }}>{stats.confirmed}</p>
            </div>
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #0ea5e9" }}
            >
              <h3>Hoàn tất</h3>
              <p style={{ color: "#0ea5e9" }}>{stats.completed}</p>
            </div>
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #ef4444" }}
            >
              <h3>Đã hủy</h3>
              <p style={{ color: "#ef4444" }}>{stats.cancelled}</p>
            </div>
            <div
              className="stat-card"
              style={{ borderTop: "4px solid #8b5cf6" }}
            >
              <h3>Doanh thu</h3>
              <p style={{ color: "#8b5cf6", fontSize: "28px" }}>
                {parseFloat(stats.totalRevenue).toLocaleString("vi-VN")}{" "}
                <span style={{ fontSize: "16px", color: "#64748b" }}>VNĐ</span>
              </p>
            </div>
          </div>
        )}

        <div className="grid-container">
          <div className="item-card">
            <div className="item-card-header">
              <h3 className="item-card-title">📅 Quản lý Booking</h3>
            </div>
            <div className="item-card-body">
              <p style={{ color: "#64748b", margin: "0 0 24px 0" }}>
                Xem và quản lý tất cả các đặt phòng của khách sạn
              </p>
            </div>
            <div
              className="item-card-actions"
              style={{ borderTop: "none", paddingTop: 0, marginTop: "auto" }}
            >
              <button
                className="btn-primary"
                style={{ width: "100%" }}
                onClick={() => navigate("/staff/bookings")}
              >
                Đi tới Booking
              </button>
            </div>
          </div>

          <div className="item-card">
            <div className="item-card-header">
              <h3 className="item-card-title">🏨 Quản lý Phòng</h3>
            </div>
            <div className="item-card-body">
              <p style={{ color: "#64748b", margin: "0 0 24px 0" }}>
                Tạo, chỉnh sửa và quản lý tình trạng phòng trống
              </p>
            </div>
            <div
              className="item-card-actions"
              style={{ borderTop: "none", paddingTop: 0, marginTop: "auto" }}
            >
              <button
                className="btn-success"
                style={{ width: "100%" }}
                onClick={() => navigate("/staff/rooms")}
              >
                Đi tới Phòng
              </button>
            </div>
          </div>

          <div className="item-card">
            <div className="item-card-header">
              <h3 className="item-card-title">👥 Quản lý Khách</h3>
            </div>
            <div className="item-card-body">
              <p style={{ color: "#64748b", margin: "0 0 24px 0" }}>
                Xem hồ sơ, lịch sử đặt phòng của khách hàng
              </p>
            </div>
            <div
              className="item-card-actions"
              style={{ borderTop: "none", paddingTop: 0, marginTop: "auto" }}
            >
              <button
                className="btn-info"
                style={{ width: "100%" }}
                onClick={() => navigate("/staff/customers")}
              >
                Đi tới Khách hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDashboardPage;
