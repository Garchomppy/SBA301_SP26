import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../store/login/loginReducer.js";
import { users } from "../data/userData.js";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [state, dispatch] = useContext(LoginContext);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_FAILURE", payload: "" });

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
        u.username === username &&
        u.password === password &&
        u.role === "admin",
    );

    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      navigate("/");
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Tên đăng nhập hoặc mật khẩu không chính xác.",
      });
      setValidated(false); // Reset validation để hiện thông báo lỗi hệ thống
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    validated,
    setValidated,
    handleLogin,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  };
};
