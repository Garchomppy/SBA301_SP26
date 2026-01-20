import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
} from "react-bootstrap";
import { users } from "../data/userData.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false); // Trạng thái kiểm tra form
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra tính hợp lệ của Bootstrap
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !username.trim() ||
      !password.trim()
    ) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const user = users.find(
      (u) =>
        u.username === username && u.password === password && u.role === "admin"
    );

    if (user) {
      navigate("/");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      setValidated(false); // Reset validation để hiện thông báo lỗi hệ thống
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <div className="d-flex justify-content-center">
          <Card
            className="shadow-lg border-0"
            style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
          >
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                  style={{ width: "60px", height: "60px", fontSize: "24px" }}
                >
                  <i className="bi bi-person-circle">👤</i>
                </div>
                <h2 className="fw-bold text-dark">Welcome Back</h2>
                <p className="text-muted small">Đăng nhập quyền Admin</p>
              </div>

              {/* Thông báo lỗi khi sai tài khoản/mật khẩu */}
              {error && (
                <Alert
                  variant="danger"
                  className="py-2 text-center small animate__animated animate__shakeX"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="small fw-bold text-secondary">
                    Tên đăng nhập
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light border-end-0">
                      <small>👤</small>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      className="bg-light border-start-0"
                      type="text"
                      placeholder="Nhập username..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ boxShadow: "none" }}
                    />
                    {/* Thông báo lỗi ngay dưới ô nhập */}
                    <Form.Control.Feedback type="invalid">
                      Vui lòng không để trống tên đăng nhập.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="small fw-bold text-secondary">
                    Mật khẩu
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-light border-end-0">
                      <small>🔒</small>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      className="bg-light border-start-0"
                      type="password"
                      placeholder="Nhập mật khẩu..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ boxShadow: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập mật khẩu.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold shadow-sm mt-2"
                  style={{
                    borderRadius: "10px",
                    transition: "all 0.3s",
                    letterSpacing: "1px",
                  }}
                >
                  ĐĂNG NHẬP
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="small text-muted">
                  Bạn gặp sự cố?{" "}
                  <a href="#" className="text-decoration-none fw-bold">
                    Quên mật khẩu
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
