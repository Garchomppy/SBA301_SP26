// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
// import Dashboard from "../pages/Dashboard.jsx";
import NewsPage from "../pages/new/NewPage.jsx";
// import Settings from "../pages/Settings.jsx";

// Layout
import AdminLayout from "../components/layout/AdminLayout.jsx";
import Login from "../pages/login/Login.jsx";
import CategoryPage from "../pages/catagory/CatagoryPage.jsx";
import UserPage from "../pages/user/UserPage.jsx";
import RegisterForm from "../pages/register/Register.jsx";
import { useAuthStore } from "../stores/authStore.js";
import Dashboard from "../pages/Dashboard.jsx";

export default function AppRoutes() {
  const { user } = useAuthStore();
  const isAuthenticated =
    !!user || localStorage.getItem("isAuthenticated") === "true";

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/"
        element={
          isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />
        }
      >
        {/* Trang chủ mặc định khi vào / */}
        <Route
          index
          element={
            user?.role === "Admin" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Staff Routes - Cho phép Admin xem luôn để tránh vòng lặp đá nhau */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="categories" element={<CategoryPage />} />

        {/* Admin Routes - Chỉ Admin mới vào được */}
        <Route
          path="users"
          element={
            user?.role === "Admin" ? (
              <UserPage />
            ) : (
              <Navigate to="/news" replace />
            )
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
