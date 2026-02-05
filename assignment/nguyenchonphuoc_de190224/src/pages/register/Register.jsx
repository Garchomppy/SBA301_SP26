// src/features/auth/components/RegisterForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import api from "../../stores/api"; 

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const password = watch("password"); // để validate confirm password

  const onSubmit = async (data) => {
    setIsLoading(true);
    setRegisterError(null);

    try {
      const payload = {
        accountName: data.username,
        accountEmail: data.email,
        accountPassword: data.password,
        accountRole: 1, // mặc định là STAFF, bạn có thể để chọn sau
        isActive: true,
      };

      const response = await api.post("/api/accounts", payload);

      if (response.status === 201) {
        toast.success("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Đăng ký thất bại. Vui lòng thử lại.";
      setRegisterError(errMsg);
      toast.error("Đăng ký thất bại");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
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
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
        className="shadow-2xl border-0 overflow-hidden"
      >
        <Card.Body className="p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div
              className="bg-success bg-opacity-10 d-inline-block p-3 rounded-circle mb-3"
              style={{ width: "60px", height: "60px" }}
            >
              <FiUserPlus size={28} className="text-success" />
            </div>
            <h3 className="fw-bold text-dark">Đăng ký FUNews Admin</h3>
            <p className="text-muted small">
              Tạo tài khoản để bắt đầu quản trị hệ thống
            </p>
          </div>

          {registerError && (
            <Alert
              variant="danger"
              className="py-2 small"
              dismissible
              onClose={() => setRegisterError(null)}
            >
              {registerError}
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
                  <FiUser className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="bg-light border-start-0 ps-0"
                  type="text"
                  placeholder="admin123"
                  {...register("username", {
                    required: "Tên đăng nhập là bắt buộc",
                    minLength: {
                      value: 4,
                      message: "Tên đăng nhập phải có ít nhất 4 ký tự",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Chỉ được chứa chữ cái, số và dấu gạch dưới",
                    },
                  })}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="small fw-bold text-secondary">
                Email
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-light border-end-0">
                  <FiMail className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="bg-light border-start-0 ps-0"
                  type="email"
                  placeholder="example@funews.com"
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="password">
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
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label className="small fw-bold text-secondary">
                Xác nhận mật khẩu
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text className="bg-light border-end-0">
                  <FiLock className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  className="bg-light border-start-0 ps-0"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100 py-2 shadow-sm fw-bold"
              style={{ borderRadius: "8px", transition: "all 0.3s" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Đang tạo tài khoản...
                </>
              ) : (
                "Đăng ký ngay"
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-decoration-none text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Đăng nhập
              </a>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Stack>
  );
}
