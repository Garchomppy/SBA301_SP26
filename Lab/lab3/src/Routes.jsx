import { Routes, Route } from "react-router-dom";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Home from "./features/orchid/Home";
import OrchidDetails from "./features/orchid/OrchidDetails";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import DashboardOrchids from "./features/orchid/DashBoard";

export default function RoutesConfig() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout onSearch={handleSearch} searchQuery={searchQuery} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetails />} />
        <Route path="/dashboard" element={<DashboardOrchids />} />
      </Route>
    </Routes>
  );
}
