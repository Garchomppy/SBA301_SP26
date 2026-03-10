import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { authService } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    emailAddress: "",
    memberPassword: "",
    memberRole: 3, // Default to Member
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "memberRole" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      alert("Welcome aboard! Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center py-5">
        <Col md={6} lg={5}>
          <Card
            ghost
            className="border-0 shadow-lg glass-panel overflow-hidden"
          >
            <div className="hero-gradient p-4 text-center">
              <h3 className="fw-bold mb-1">Create Account</h3>
              <p className="opacity-75 small mb-0">
                Join our Car Management community
              </p>
            </div>
            <Card.Body className="p-4 p-lg-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Member ID
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="memberId"
                    placeholder="PS0001"
                    className="bg-light border-0 py-2"
                    value={formData.memberId}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted small">
                    Unique identifier for your profile.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    placeholder="your@email.com"
                    className="bg-light border-0 py-2"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Security Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="memberPassword"
                    placeholder="••••••••"
                    className="bg-light border-0 py-2"
                    value={formData.memberPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label className="small fw-bold text-secondary text-uppercase">
                    Preferred Role
                  </Form.Label>
                  <Form.Select
                    name="memberRole"
                    value={formData.memberRole}
                    className="bg-light border-0 py-2 cursor-pointer"
                    onChange={handleChange}
                  >
                    <option value={3}>Member (Standard)</option>
                    <option value={2}>Staff (Technician)</option>
                    <option value={1}>Administrator (Full Access)</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 fw-bold shadow-sm"
                >
                  Launch Profile
                </Button>

                <div className="text-center mt-4">
                  <span className="small text-secondary">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="fw-bold text-primary text-decoration-none"
                    >
                      Sign In
                    </a>
                  </span>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
