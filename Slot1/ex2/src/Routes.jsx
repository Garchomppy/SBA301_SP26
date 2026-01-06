import { Routes, Route } from "react-router-dom";
import About from "./features/AboutUs";
import Contact from "./features/ContactUs";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
