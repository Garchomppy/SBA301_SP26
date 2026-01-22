import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { getOrchidById } from "../services/orchid/orchidService";

function OrchidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await getOrchidById(id);
        setOrchid(response.data);
      } catch (error) {
        console.error("Error fetching orchid:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrchid();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <h2 className="display-4 text-muted">Loading...</h2>
      </Container>
    );
  }

  if (!orchid) {
    return (
      <Container className="text-center my-5 py-5">
        <h2 className="display-4 text-muted">Oops! Không tìm thấy lan</h2>
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5 p-4 ">
      <Button
        variant="link"
        className="text-decoration-none text-secondary mb-4 p-0 align-self-start"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i> ← Quay lại danh sách
      </Button>
      <Row>
        <Col md={6} className="p-0">
          <div style={{ overflow: "hidden", height: "100%" }}>
            <img
              src={`/${orchid.image}`}
              alt={orchid.orchidName}
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </Col>

        {/* Cột thông tin */}
        <Col md={6} className="p-5 d-flex flex-column justify-content-center">
          <div className="mb-2">
            <Badge bg="success" className="me-2 px-3 py-2 uppercase-tracking">
              {orchid.category.toUpperCase()}
            </Badge>
            {orchid.isSpecial && (
              <Badge pill bg="danger" className="px-3 py-2">
                🔥 Đặc sắc
              </Badge>
            )}
          </div>

          <h1 className="display-5 fw-bold mb-3 text-dark">
            {orchid.name || orchid.orchidName}
          </h1>

          <div className="mb-4">
            <h4 className="text-primary fw-bold">
              Giá bán: {orchid.price || "Liên hệ"}
            </h4>
            <hr style={{ width: "50px", borderTop: "3px solid #0d6efd" }} />
          </div>

          <Card className="border-0 bg-light mb-4">
            <Card.Body>
              <h5 className="fw-bold">Mô tả sản phẩm</h5>
              <Card.Text className="text-muted" style={{ lineHeight: "1.8" }}>
                {orchid.description}
              </Card.Text>
            </Card.Body>
          </Card>

          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="bg-transparent px-0">
              <strong>Xuất xứ:</strong> {orchid.origin || "Việt Nam"}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent px-0">
              <strong>Màu sắc:</strong> {orchid.color || "Tự nhiên"}
            </ListGroup.Item>
          </ListGroup>

          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant="dark"
              className="rounded-pill py-3 fw-bold"
            >
              Thêm vào bộ sưu tập
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrchidDetails;
