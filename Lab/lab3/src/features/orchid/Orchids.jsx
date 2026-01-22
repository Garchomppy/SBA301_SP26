import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Orchid({
  id,
  orchidName,
  image,
  category,
  description,
  price,
  isSpecial = false,
}) {
  // Handle image source - check if it's stored in localStorage
  const getImageSrc = () => {
    if (image && image.startsWith("./assets/")) {
      const fileName = image.replace("./assets/", "");
      const storedImage = localStorage.getItem(`image${fileName}`);
      return storedImage || image;
    }
    return image;
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            style={{ height: "200px", objectFit: "cover" }}
            src={getImageSrc()}
            alt={orchidName}
          />
          {isSpecial && (
            <Badge
              bg="info"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
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
            {description.substring(0, 100)}...
          </Card.Text>
          <p>
            <strong>Price:</strong> ${price}
          </p>
          <div className="d-flex gap-2 mt-auto">
            <Link
              to={`/orchid/${id}`}
              style={{ textDecoration: "none", flex: 1 }}
            >
              <Button variant="primary" className="w-100">
                View Details
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
