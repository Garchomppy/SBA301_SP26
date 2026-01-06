// src/pages/Contact.js hoặc src/components/Contact.js
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export default function Contact() {
  return (
    <main className="py-5">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-5 py-5 bg-success text-white rounded-4">
          <h1 className="display-4 fw-bold">Liên Hệ Với Chúng Tôi</h1>
          <p className="lead fs-4">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn!
          </p>
        </div>

        <Row className="g-5">
          {/* Contact Form */}
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <h3 className="mb-4 fw-bold">Gửi tin nhắn cho chúng tôi</h3>
                <Form>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="formName">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập họ tên"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="example@email.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="formSubject">
                        <Form.Label>Chủ đề</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Chủ đề liên hệ"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="formMessage">
                        <Form.Label>Tin nhắn</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Nội dung tin nhắn..."
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button variant="primary" size="lg" type="submit">
                        Gửi Tin Nhắn
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-5">
                <h3 className="mb-4 fw-bold">Thông Tin Liên Hệ</h3>
                <div className="mb-4">
                  <h5 className="text-primary">📍 Địa chỉ</h5>
                  <p>
                    123 Đường Láng, Quận Đống Đa
                    <br />
                    Hà Nội, Việt Nam
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="text-primary">📞 Điện thoại</h5>
                  <p>+84 24 1234 5678</p>
                </div>
                <div className="mb-4">
                  <h5 className="text-primary">✉️ Email</h5>
                  <p>info@yourcompany.vn</p>
                </div>
                <div>
                  <h5 className="text-primary">⏰ Giờ làm việc</h5>
                  <p>
                    Thứ 2 - Thứ 6: 8:30 - 17:30
                    <br />
                    Thứ 7: 8:30 - 12:00
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
