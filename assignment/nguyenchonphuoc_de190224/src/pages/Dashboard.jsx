import { Container, Card, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../stores/authStore";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark">Dashboard</h2>
          <p className="text-muted">
            Chào mừng quay trở lại, {user?.username}!
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="border-0 shadow-sm rounded-4 bg-primary text-white p-4">
            <Card.Body>
              <h3 className="fw-bold">Xin chào, {user?.username}</h3>
              <p className="fs-5 opacity-75">
                Bạn đang đăng nhập với vai trò: <strong>{user?.role}</strong>
              </p>
              <div className="mt-4">
                <span className="badge bg-white text-primary px-3 py-2 rounded-pill fw-bold">
                  Hệ thống hoạt động bình thường
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
