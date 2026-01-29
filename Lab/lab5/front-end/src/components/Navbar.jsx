import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        {/* Brand: Nhấn vào logo sẽ quay về trang chủ */}
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-flower1 me-2"></i> Orchid Manager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* NavLink giúp tự động thêm class 'active' khi bạn đang ở trang đó */}
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            
            {/* Nếu bạn muốn có thêm các mục khác trong tương lai */}
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link href="https://github.com" target="_blank">
              <i className="bi bi-github"></i> GitHub
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}