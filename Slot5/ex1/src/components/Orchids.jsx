import { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

export default function Orchid({
  orchidName,
  image,
  category,
  description,
  price,
  isSpecial = false,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            style={{ height: "200px", objectFit: "cover" }}
            src={image}
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
          <Button
            variant="primary"
            className="mt-auto w-100"
            onClick={handleShow}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={show}
        handleClose={handleClose}
        title={orchidName}
        body={
          <div>
            <img
              src={image}
              alt={orchidName}
              style={{ width: "100%", marginBottom: "15px" }}
            />
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
            <p>{description}</p>
          </div>
        }
      />
    </>
  );
}
