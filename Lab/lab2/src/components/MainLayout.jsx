//create the main layout
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function MainLayout({ searchQuery, onSearch }) {
  return (
    <>
      <Header onSearch={onSearch} searchQuery={searchQuery} />
      <Container>
        <Outlet />
      </Container>
      <Footer images="/pic.jpg" name="NCP" email="chontem123@gmail.com" />
    </>
  );
}
