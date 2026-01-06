import Nav from "react-bootstrap/Nav";

export default function Header() {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/about" eventKey="link-1">
          About
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/contact" eventKey="link-2">
          Contact us
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
