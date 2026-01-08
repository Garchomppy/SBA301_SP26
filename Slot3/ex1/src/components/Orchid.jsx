import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";

export default function Orchid() {
  const orchidData = [
    {
      id: "1",
      orchidName: "Orchid Beautiful",
      description:
        "Orchid Beautiful is a stunning variety of orchid known for its vibrant colors and intricate patterns. It thrives in tropical climates and requires specific care to maintain its beauty. This orchid is often used in floral arrangements and as a decorative plant in homes and gardens. Its unique appearance makes it a favorite among orchid enthusiasts and collectors.",
      category: " Tropical",
      price: 29.99,
      isSpecial: true,
      image: "./assets/lan1.jpg",
    },
    {
      id: "2",
      orchidName: "Orchid Beautiful",
      description:
        "Orchid Beautiful is a stunning variety of orchid known for its vibrant colors and intricate patterns. It thrives in tropical climates and requires specific care to maintain its beauty. This orchid is often used in floral arrangements and as a decorative plant in homes and gardens. Its unique appearance makes it a favorite among orchid enthusiasts and collectors.",
      category: " Tropical",
      price: 29.99,
      isSpecial: false,
      image: "./assets/lan2.jpg",
    },
    {
      id: "3",
      orchidName: "Orchid Beautiful",
      description:
        "Orchid Beautiful is a stunning variety of orchid known for its vibrant colors and intricate patterns. It thrives in tropical climates and requires specific care to maintain its beauty. This orchid is often used in floral arrangements and as a decorative plant in homes and gardens. Its unique appearance makes it a favorite among orchid enthusiasts and collectors.",
      category: " Tropical",
      price: 29.99,
      isSpecial: false,
      image: "./assets/lan3.jpg",
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Danh sách Lan</h2>
      <Row>
        {orchidData.map((orchidData) => (
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <div style={{ position: "relative" }}>
                <Card.Img
                  variant="top"
                  height={"200px"}
                  src={orchidData.image}
                  alt={orchidData.orchidName}
                />
                {orchidData.isSpecial && (
                  <Badge
                    bg="info"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "none",
                    }}
                  >
                    💖
                  </Badge>
                )}
              </div>

              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="mb-0">
                    {orchidData.orchidName}
                  </Card.Title>
                  <Badge bg="info" text="dark">
                    {orchidData.category}
                  </Badge>
                </div>

                <Card.Text
                  className="text-muted"
                  style={{ fontSize: "0.9rem", textAlign: "justify" }}
                >
                  {orchidData.description.substring(0, 150)}...
                </Card.Text>
                <h5 className="mt-2 mb-3">${orchidData.price.toFixed(2)}</h5>
                <Button variant="primary" className="mt-auto w-100">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
