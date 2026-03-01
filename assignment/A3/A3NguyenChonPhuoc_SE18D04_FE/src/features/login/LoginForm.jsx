import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  const inputStyle = (fieldError) => ({
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    boxSizing: "border-box",
    border: fieldError ? "2px solid #dc3545" : "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: fieldError ? "#fff5f5" : "#fff",
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "#dc3545", margin: "10px 0" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={inputStyle(errors.email)}
            placeholder="Nhập email"
          />
          {errors.email && (
            <p style={{ color: "#dc3545", fontSize: "12px", margin: "4px 0" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label>Mật khẩu:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={inputStyle(errors.password)}
            placeholder="Nhập mật khẩu"
          />
          {errors.password && (
            <p style={{ color: "#dc3545", fontSize: "12px", margin: "4px 0" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid()}
          style={{
            padding: "10px 20px",
            background: isFormValid() && !loading ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid() && !loading ? "pointer" : "not-allowed",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Chưa có tài khoản?{" "}
        <a
          href="/register"
          style={{ color: "#28a745", textDecoration: "none" }}
        >
          Đăng ký
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
