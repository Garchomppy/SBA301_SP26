import { Routes, Route } from "react-router-dom";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import { useState } from "react";
import OrchidDetails from "./components/OrchidDetails";
import Login from "./components/Login";

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
          <MainLayout onSearch={handleSearch} searchQuery={searchQuery} />
        }
      >
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orchid/:id" element={<OrchidDetails />} />
      </Route>
    </Routes>
  );
}
