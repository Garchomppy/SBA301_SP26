// src/pages/Login.jsx
import LoginForm from "../../features/auth/components/LoginForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.title = "Đăng nhập | FUNews Management";
  }, []);

  return (
    <main className="auth-wrapper">
      <LoginForm />
    </main>
  );
}
