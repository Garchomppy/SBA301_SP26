import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CarManagement from "../pages/CarManagement";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars" element={<CarManagement />} />
      <Route path="/cars/new" element={<CarManagement />} />{" "}
      {/* Reusing component for create simplicity */}
    </Routes>
  );
};

export default AppRoutes;
