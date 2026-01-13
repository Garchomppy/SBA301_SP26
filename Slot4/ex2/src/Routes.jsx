import { Routes, Route } from "react-router-dom";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Home from "./components/Home";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
