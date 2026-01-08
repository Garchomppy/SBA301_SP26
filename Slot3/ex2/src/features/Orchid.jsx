import { Card, Button, Row, Col, Badge } from "react-bootstrap";

export default function Orchid({
  orchidName,
  image,
  category,
  description,
  price,
  isSpecial,
}) {
  return (
    <Card className="h-100 shadow-sm">
      <div style={{ position: "relative" }}>
        <Card.Img variant="top" height={"200px"} src={image} alt={orchidName} />
        {isSpecial && (
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
          <Card.Title className="mb-0">{orchidName}</Card.Title>
          <Badge bg="info" text="dark">
            {category}
          </Badge>
        </div>

        <Card.Text
          className="text-muted"
          style={{ fontSize: "0.9rem", textAlign: "justify" }}
        >
          {description.substring(0, 150)}...
        </Card.Text>
        <h5 className="mt-2 mb-3">${price.toFixed(2)}</h5>
        <Button variant="primary" className="mt-auto w-100">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
