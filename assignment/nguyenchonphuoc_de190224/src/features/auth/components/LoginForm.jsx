// src/features/auth/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useAuthStore } from "../../../stores/authStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError(null);

    const success = await login(data.username, data.password);
    console.log("Login Success Status:", success); // Xem nó in ra true hay false
    if (success) {
      toast.success("Đăng nhập thành công Nguyễn Chơn!");
      navigate("/", { replace: true });
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không đúng!");
      toast.error("Đăng nhập thất bại");
    }
    setIsLoading(false);
  };

  return (
    <Stack
      className="justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
        className="shadow-2xl border-0 overflow-hidden"
      >
        <Card.Body className="p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div
              className="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3"
              style={{ width: "60px", height: "60px" }}
            >
              <FiLogIn size={28} className="text-primary" />
            </div>
            <h3 className="fw-bold text-dark">FUNews Admin</h3>
            <p className="text-muted small">
              Vui lòng nhập thông tin để quản trị hệ thống
            </p>
          </div>

          {loginError && (
            <Alert
              variant="danger"
              className="py-2 small"
              dismissible
              onClose={() => setLoginError(null)}
            >
              {loginError}
            </Alert>
          )}

          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="small fw-bold text-secondary">
                Tên đăng nhập
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-light border-end-0">
                  <FiMail className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="bg-light border-start-0 ps-0"
                  type="text"
                  placeholder="Admin"
                  {...register("username", {
                    required: "Tên đăng nhập là bắt buộc",
                  })}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="small fw-bold text-secondary">
                Mật khẩu
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-light border-end-0">
                  <FiLock className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="bg-light border-start-0 ps-0"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 shadow-sm fw-bold"
              style={{ borderRadius: "8px", transition: "all 0.3s" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Đang xác thực...
                </>
              ) : (
                "Đăng nhập ngay"
              )}
            </Button>
          </Form>

          <div className="text-center mt-2">
            <small className="text-muted">
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-decoration-none text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Đăng ký
              </a>
            </small>
          </div>
          <div className="text-center mt-2">
            <small className="text-muted">
              Quên mật khẩu?{" "}
              <a href="#" className="text-decoration-none">
                Liên hệ Admin
              </a>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Stack>
  );
}
