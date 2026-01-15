// src/pages/Contact.js hoặc src/components/Contact.js
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi"; // Icons hiện đại
import ConfirmModal from "./ConfirmModal";

export default function Contact() {
  const [modalShow, setModalShow] = React.useState(false);
  const [validated, setValidated] = React.useState(false);

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setModalShow(true);
    }
    handleShow();
    setValidated(true);
  };
  return (
    <main className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="g-15 justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-lg overflow-hidden rounded-4">
              <div className="bg-primary p-2" />{" "}
              <Card.Body className="p-4 p-md-5">
                <h3 className="fw-bold mb-4 d-flex align-items-center">
                  Gửi lời nhắn <FiSend className="ms-2 text-primary" />
                </h3>

                <Form onSubmit={handleSubmit} validated={validated} noValidate>
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-uppercase text-muted">
                          First Name
                        </Form.Label>
                        <Form.Control
                          className="py-2 bg-light border-0"
                          type="text"
                          placeholder="John"
                          required
                          minLength={2} // Ít nhất 2 ký tự
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập tên (ít nhất 2 ký tự).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Last Name */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-uppercase text-muted">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          className="py-2 bg-light border-0"
                          type="text"
                          placeholder="Doe"
                          required
                          minLength={2}
                        />
                        <Form.Control.Feedback type="invalid">
                          Vui lòng nhập họ.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Email Address */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-uppercase text-muted">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          className="py-2 bg-light border-0"
                          type="email"
                          placeholder="name@company.com"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Email không đúng định dạng (vd: abc@gmail.com).
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Phone - Quan trọng nhất */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-uppercase text-muted">
                          Phone
                        </Form.Label>
                        <Form.Control
                          className="py-2 bg-light border-0"
                          type="tel" // Đổi sang type tel
                          placeholder="0918xxxxxx"
                          required
                          pattern="^(0[3|5|7|8|9])([0-9]{8})$" // Regex kiểm tra SĐT Việt Nam (10 số, bắt đầu bằng đầu số VN)
                        />
                        <Form.Control.Feedback type="invalid">
                          SĐT phải có 10 chữ số và đúng định dạng Việt Nam.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Message */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-uppercase text-muted">
                          Your Message
                        </Form.Label>
                        <Form.Control
                          className="py-2 bg-light border-0"
                          as="textarea"
                          rows={4}
                          placeholder="Tôi muốn hỏi về..."
                          required
                          minLength={10} // Tránh tin nhắn quá ngắn
                        />
                        <Form.Control.Feedback type="invalid">
                          Nội dung tin nhắn phải ít nhất 10 ký tự.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Checkbox */}
                    <Col md={12}>
                      <Form.Check
                        required
                        feedback="Bạn phải đồng ý trước khi gửi."
                        feedbackType="invalid"
                        label={
                          <small className="text-muted">
                            Tôi đồng ý với chính sách bảo mật
                          </small>
                        }
                      />
                    </Col>

                    <Col md={12}>
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-3 fw-bold rounded-3 shadow-sm"
                      >
                        Gửi đi ngay
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <div className="d-flex flex-column gap-4">
              <h2 className="fw-bold mb-2">Get in touch</h2>
              <p className="text-muted mb-4">
                Chúng tôi rất mong nhận được phản hồi từ bạn. Hãy liên hệ qua
                các kênh dưới đây.
              </p>

              {/* Info Cards */}
              {[
                {
                  icon: <FiMapPin />,
                  title: "Địa chỉ",
                  content: "123 Đường Láng, Hà Nội",
                  color: "#0d6efd",
                },
                {
                  icon: <FiPhone />,
                  title: "Điện thoại",
                  content: "+84 24 1234 5678",
                  color: "#198754",
                },
                {
                  icon: <FiMail />,
                  title: "Email",
                  content: "info@orchid.studio",
                  color: "#dc3545",
                },
                {
                  icon: <FiClock />,
                  title: "Giờ làm việc",
                  content: "Mon-Sat: 8:30 - 17:30",
                  color: "#ffc107",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm hover-translate-y"
                >
                  <Card.Body className="d-flex align-items-center p-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        fontSize: "1.2rem",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{item.title}</h6>
                      <small className="text-muted">{item.content}</small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <ConfirmModal
        show={modalShow}
        handleClose={handleClose}
        onConfirm={() => {
          alert("Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.");
          handleClose();
        }}
        body="Thông tin của bạn sẽ được bảo mật và gửi tới bộ phận chăm sóc khách hàng."
        title="Xác nhận gửi thông tin"
      />
    </main>
  );
}
