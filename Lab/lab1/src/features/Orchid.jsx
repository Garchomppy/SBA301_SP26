import React, { useState } from "react"; // 1. Import useState
import { Card, Button, Badge, Modal } from "react-bootstrap"; // 2. Import Modal

export default function Orchid({
  orchidName,
  image,
  category,
  description,
  isSpecial,
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

          <Button
            variant="primary"
            className="mt-auto w-100"
            onClick={handleShow}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{orchidName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <img
              src={image}
              alt={orchidName}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
          <h4>
            Category: <Badge bg="secondary">{category}</Badge>
          </h4>
          <hr />
          <p style={{ textAlign: "justify" }}>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
