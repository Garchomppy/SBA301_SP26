import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./Routes";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <RoutesConfig />
      <main className="flex-grow-1">
        <Container className="py-5">
          <div className="text-center mb-5 py-5 bg-primary text-white rounded-4 shadow-lg">
            <h1 className="display-4 fw-bold">
              Chào mừng đến với Website của chúng tôi
            </h1>
            <p className="lead fs-4 mt-3">
              Một ứng dụng React hiện đại, đẹp mắt và responsive.
            </p>
            <button className="btn btn-light btn-lg mt-4 px-5">
              Bắt đầu ngay
            </button>
          </div>
        </Container>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
