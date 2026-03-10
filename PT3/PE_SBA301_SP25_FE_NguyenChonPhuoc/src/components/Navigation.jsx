import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { authService } from "../services/apiService";
import { jwtDecode } from "jwt-decode";

const Navigation = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Token decode error", e);
      }
    }
  }, []);

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        emailAddress: email,
        memberPassword: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      handleClose();
      alert("Welcome back! Login successful.");
      window.location.reload();
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message),
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand href="/" className="fs-3">
            DE190224 <span className="fw-light">NguyenChonPhuoc</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-lg-4 gap-lg-3">
              <Nav.Link href="/" className="fw-medium">
                Home
              </Nav.Link>
              <NavDropdown
                title="Car Management"
                id="basic-nav-dropdown"
                className="fw-medium"
              >
                <NavDropdown.Item href="/cars">Inventory List</NavDropdown.Item>
                {user?.role?.includes("ROLE_1") && (
                  <NavDropdown.Item href="/cars/new">
                    Register New Vehicle
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
            <Nav className="align-items-center gap-3">
              {user ? (
                <>
                  <span className="text-light opacity-75 d-none d-lg-inline">
                    Hello, <span className="text-info fw-bold">{user.sub}</span>
                  </span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    className="px-4"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/register" className="fw-medium">
                    Register
                  </Nav.Link>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="px-4 shadow-sm"
                  >
                    Login
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogin} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center fs-4 mt-3">
            Welcome Back
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 pt-1">
          <p className="text-secondary text-center small mb-4">
            Login to Cars Management System
          </p>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="small fw-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                className="bg-light border-0 py-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="small fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                className="bg-light border-0 py-2"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 fw-bold"
            >
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
