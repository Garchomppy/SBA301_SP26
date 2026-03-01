import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home/Home";
import LoginForm from "../features/login/LoginForm";
import RegisterForm from "../features/login/RegisterForm";
import ProfilePage from "../pages/profile/Profile";
import BookingCreatePage from "../pages/booking/BookingCreate";
import BookingHistoryPage from "../pages/booking/BookingHistory";
import StaffDashboardPage from "../pages/staff/Dashboard";
import CustomerManagementPage from "../pages/staff/CustomerManagement";
import RoomManagementPage from "../pages/staff/RoomManagement";
import BookingManagementPage from "../pages/staff/BookingManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/bookings/create" element={<BookingCreatePage />} />
      <Route path="/bookings/history" element={<BookingHistoryPage />} />

      {/* Staff routes */}
      <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
      <Route path="/staff/bookings" element={<BookingManagementPage />} />
      <Route path="/staff/rooms" element={<RoomManagementPage />} />
      <Route path="/staff/customers" element={<CustomerManagementPage />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
