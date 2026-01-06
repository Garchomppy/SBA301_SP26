import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <main className="py-5">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-5 py-5 bg-primary text-white rounded-4">
          <h1 className="display-4 fw-bold">Về Chúng Tôi</h1>
          <p className="lead fs-4">
            Chúng tôi là đội ngũ đam mê công nghệ, mang đến giải pháp tốt nhất
            cho bạn.
          </p>
        </div>

        {/* Mission & Vision */}
        <Row className="g-5 mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="p-4">
                <h3 className="text-primary fw-bold">Sứ Mệnh</h3>
                <p className="fs-5">
                  Xây dựng các sản phẩm công nghệ hiện đại, dễ sử dụng và giúp
                  doanh nghiệp phát triển mạnh mẽ trong thời đại số.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="p-4">
                <h3 className="text-primary fw-bold">Tầm Nhìn</h3>
                <p className="fs-5">
                  Trở thành đối tác công nghệ đáng tin cậy hàng đầu tại Việt Nam
                  và khu vực Đông Nam Á vào năm 2030.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Members */}
        <h2 className="text-center mb-5 fw-bold">Đội Ngũ Của Chúng Tôi</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x300?text=Member+1"
                className="rounded-circle mx-auto mt-4"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5>Nguyễn Văn A</h5>
                <p className="text-muted">CEO & Founder</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x300?text=Member+2"
                className="rounded-circle mx-auto mt-4"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5>Trần Thị B</h5>
                <p className="text-muted">CTO</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x300?text=Member+3"
                className="rounded-circle mx-auto mt-4"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5>Lê Văn C</h5>
                <p className="text-muted">Lead Developer</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
