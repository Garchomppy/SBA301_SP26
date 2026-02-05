// src/components/layout/Header.jsx
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bell, PersonCircle } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="fw-bold">
          <img src="/logo.jpg" alt="FUNews" style={{ height: "50px" }} />
          FUNews Admin
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-3">
            <Button variant="outline-primary" size="sm" className="me-2">
              <Bell /> Thông báo
            </Button>
            <Navbar.Text className="me-3">
              <PersonCircle className="me-1" /> {userRole}
            </Navbar.Text>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
