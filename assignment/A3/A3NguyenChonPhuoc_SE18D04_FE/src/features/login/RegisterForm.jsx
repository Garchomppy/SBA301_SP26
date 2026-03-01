import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const { register } = useAuth();
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
    if (value.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
  };

  const validateFullName = (value) => {
    if (!value.trim()) {
      return "Họ và tên không được để trống";
    }
    if (value.trim().length < 3) {
      return "Họ và tên phải có ít nhất 3 ký tự";
    }
    return "";
  };

  const validateConfirmPassword = (pwd, cfmPwd) => {
    if (!cfmPwd) {
      return "Vui lòng xác nhận mật khẩu";
    }
    if (pwd !== cfmPwd) {
      return "Mật khẩu không khớp";
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
      confirmPassword: confirmPassword
        ? validateConfirmPassword(value, confirmPassword)
        : "",
    });
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setErrors({
      ...errors,
      fullName: validateFullName(value),
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(password, value),
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      !errors.email &&
      !errors.password &&
      !errors.fullName &&
      !errors.confirmPassword &&
      email &&
      password &&
      fullName &&
      confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Final validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const fullNameError = validateFullName(fullName);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );

    if (emailError || passwordError || fullNameError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        fullName: fullNameError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setLoading(true);

    const result = await register(email, password, fullName);

    setLoading(false);

    if (result.success) {
      setSuccess(result.message || "Đăng ký thành công!");
      // Clear form
      setEmail("");
      setPassword("");
      setFullName("");
      setConfirmPassword("");
      setErrors({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(result.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: "480px" }}>
        <div className="auth-header">
          <h2 className="auth-title">Đăng ký tài khoản</h2>
          <p className="auth-subtitle">
            Tạo tài khoản mới để bắt đầu trải nghiệm
          </p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label className="auth-label">Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className={`auth-input ${errors.fullName ? "error" : ""}`}
              placeholder="VD: Nguyễn Văn A"
            />
            {errors.fullName && (
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
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`auth-input ${errors.email ? "error" : ""}`}
              placeholder="Nhập địa chỉ email hợp lệ"
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
              placeholder="Tối thiểu 6 ký tự"
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

          <div className="auth-form-group">
            <label className="auth-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`auth-input ${errors.confirmPassword ? "error" : ""}`}
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && (
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
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="auth-button"
            style={{ backgroundColor: !isFormValid() ? "" : "#10b981" }}
          >
            {loading ? "Đang thiết lập..." : "Đăng ký ngay"}
          </button>
        </form>

        <div className="auth-footer">
          Đã có tài khoản?{" "}
          <a href="/login" className="auth-link">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
