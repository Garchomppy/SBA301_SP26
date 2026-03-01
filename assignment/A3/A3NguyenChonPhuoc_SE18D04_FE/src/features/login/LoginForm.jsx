import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Auth.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email không được để trống";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Email không hợp lệ";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Mật khẩu không được để trống";
    }
    if (value.length < 5) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
  };

  // Handle input change with real-time validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({
      ...errors,
      email: validateEmail(value),
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value),
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    return !errors.email && !errors.password && email && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Final validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      // decide where to go based on role from token
      let role = "CUSTOMER";
      try {
        const decodeFunc = jwtDecode.default || jwtDecode;
        const decoded = decodeFunc(result.token);
        if (
          decoded.role === "ROLE_STAFF" ||
          (decoded.authorities &&
            decoded.authorities.some((a) => a.authority === "ROLE_STAFF"))
        ) {
          role = "STAFF";
        }
      } catch (e) {
        console.error("Failed to decode token", e);
      }
      navigate(role === "STAFF" ? "/staff/dashboard" : "/home");
    } else {
      setError(result.message || "Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Chào mừng trở lại</h2>
          <p className="auth-subtitle">
            Đăng nhập để quản lý và trải nghiệm dịch vụ
          </p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`auth-input ${errors.email ? "error" : ""}`}
              placeholder="Nhập email của bạn"
            />
            {errors.email && (
              <p className="auth-error-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`auth-input ${errors.password ? "error" : ""}`}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <p className="auth-error-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="auth-button"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="auth-footer">
          Chưa có tài khoản?{" "}
          <a href="/register" className="auth-link">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
