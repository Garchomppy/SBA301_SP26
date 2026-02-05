// src/components/layout/Sidebar.jsx
import { Nav, ListGroup, Card, Stack, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HouseFill,
  TagsFill,
  Newspaper,
  PersonLinesFill,
  GearFill,
  BoxArrowRight,
  PersonCircle,
} from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };

  // Helper function để xử lý class active cho NavLink
  const navLinkClass = ({ isActive }) =>
    `list-group-item list-group-item-action border-0 d-flex align-items-center py-3 px-4 mb-1 rounded-3 transition-all ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "bg-transparent text-light opacity-75"
    }`;

  return (
    <Stack
      className="bg-dark text-white shadow-lg"
      style={{
        flex: "0.1 1 auto",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #212529 0%, #1a1d20 100%)",
      }}
    >
      {/* Brand Section */}
      <Stack className="p-4 text-center align-items-center" gap={2}>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-center"
        >
          <div className="bg-primary rounded-3 p-2">
            <Newspaper size={24} color="white" />
          </div>
          <h4 className="mb-0 fw-bold tracking-tight">FU NEWS</h4>
        </Stack>
        <div className="badge bg-secondary bg-opacity-25 text-white fw-normal px-3">
          Management System
        </div>
      </Stack>

      <hr className="mx-4 opacity-10" />

      {/* Navigation Menu */}
      <div className="px-3 flex-grow-1">
        <small
          className="text-uppercase fw-bold mb-3 d-block ps-3 text-white"
          style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
        >
          Menu chính
        </small>
        <ListGroup variant="flush">
          <NavLink to="/dashboard" className={navLinkClass}>
            <HouseFill className="me-3 fs-5" />
            <span>Dashboard</span>
          </NavLink>

          {user?.role === "Staff" && (
            <>
              <NavLink to="/categories" className={navLinkClass}>
                <TagsFill className="me-3 fs-5" />
                <span>Danh mục</span>
              </NavLink>

              <NavLink to="/news" className={navLinkClass}>
                <Newspaper className="me-3 fs-5" />
                <span>Tin tức</span>
              </NavLink>
            </>
          )}

          {user?.role === "Admin" && (
            <NavLink to="/users" className={navLinkClass}>
              <PersonLinesFill className="me-3 fs-5" />
              <span>Người dùng</span>
            </NavLink>
          )}

          <NavLink to="/settings" className={navLinkClass}>
            <GearFill className="me-3 fs-5" />
            <span>Cài đặt</span>
          </NavLink>
        </ListGroup>
      </div>

      {/* User Card & Logout */}
      <div className="p-3 border-top border-secondary border-opacity-25">
        {user && (
          <Card className="bg-white bg-opacity-10 border-0 mb-3 rounded-4 overflow-hidden">
            <Card.Body className="p-3">
              <Stack
                direction="horizontal"
                gap={3}
                className="align-items-center"
              >
                <div className="position-relative">
                  <PersonCircle
                    size={38}
                    className="text-primary bg-white rounded-circle shadow-sm"
                  />
                  <span
                    className="position-absolute bottom-0 end-0 bg-success border border-2 border-dark rounded-circle"
                    style={{ width: "12px", height: "12px" }}
                  ></span>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="fw-bold text-truncate"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {user.username}
                  </div>
                  <div
                    className="text-primary x-small fw-semibold text-uppercase"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {user.role}
                  </div>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        )}

        <Button
          variant="outline-danger"
          className="w-100 d-flex align-items-center justify-content-center py-2 border-2 fw-bold"
          style={{ borderRadius: "10px", transition: "0.3s" }}
          onClick={handleLogout}
        >
          <BoxArrowRight className="me-2" />
          Đăng xuất
        </Button>
      </div>
    </Stack>
  );
}
