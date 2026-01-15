import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { navbar } from "../data/Navbar";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import Couresel from "./Couresel";

export default function Header({ searchQuery, onSearch }) {
  const location = useLocation();

  const getContent = () => {
    switch (location.pathname) {
      case "/contact":
        return {
          title: "Liên Hệ",
          desc: "Kết nối với chúng tôi ngay hôm nay.",
        };
      case "/about":
        return {
          title: "Về Chúng Tôi",
          desc: "Câu chuyện về niềm đam mê hoa lan.",
        };
      default:
        return {
          title: "Trang Chủ",
          desc: "Chào mừng bạn đến với shop hoa lan.",
        };
    }
  };

  const content = getContent();

  return (
    <>
      <Couresel />

      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm py-3"
      >
        <Container>
          <Navbar.Brand href="/home" className="fw-bold fs-3">
            <span className="text-primary">Orchid</span>Studio
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {navbar.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={link.path}
                  className="px-3 text-uppercase fw-semibold"
                  style={{ fontSize: "0.9rem", letterSpacing: "1px" }}
                >
                  {link.title}
                </Nav.Link>
              ))}
            </Nav>

            <div className="d-flex align-items-center gap-2 w-50">
              <SearchBar onSearch={onSearch} value={searchQuery} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className="text-white text-center d-flex align-items-center shadow-sm"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
      >
        <Container>
          <div className="py-5 animate__animated animate__fadeIn">
            <h1 className="display-2 fw-bold mb-3">{content.title}</h1>
            <p
              className="lead fs-4 mb-4 mx-auto shadow-text"
              style={{ maxWidth: "700px" }}
            >
              {content.desc}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold"
              >
                Bắt đầu ngay
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
