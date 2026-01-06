import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={4}>
            <Image
              src="pic.jpg"
              height={"100px"}
              width={"80px"}
              roundedCircle
            />
          </Col>

          <Col md={4} className="text-center">
            <Row>
              <h5>Tác giả: &copy; {new Date().getFullYear()} NCP</h5>
            </Row>
            <Row>
              <small>All rights reserved.</small>
            </Row>
          </Col>
          <Col md={4}>
            <a href="#"> chontem123@gmail.com</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
