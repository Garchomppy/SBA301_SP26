import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient py-5 mb-5 shadow-lg">
        <Container className="py-5 text-center text-md-start">
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInLeft">
                Next-Gen Car Management
              </h1>
              <p className="lead mb-5 opacity-90 animate__animated animate__fadeInLeft animate__delay-1s">
                Streamline your inventory, manage your fleet, and experience the
                ultimate efficiency with our premium Car Store system.
              </p>
              <div className="d-grid d-md-flex gap-3 animate__animated animate__fadeInUp animate__delay-2s">
                <Button
                  variant="light"
                  size="lg"
                  href="/cars"
                  className="px-5 fw-bold text-primary shadow"
                >
                  Browse Inventory
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  href="/register"
                  className="px-5 fw-bold"
                >
                  Join Now
                </Button>
              </div>
            </Col>
            <Col
              lg={6}
              className="d-none d-lg-block text-center animate__animated animate__fadeInRight"
            >
              {/* Abstract decorative element since I don't have an image path yet */}
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "10rem" }}>🚗</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="pb-5">
        <Row className="g-4">
          {[
            {
              title: "Smart Inventory",
              icon: "📊",
              text: "Real-time tracking of units in stock and pricing details.",
            },
            {
              title: "Global Sourcing",
              icon: "🌍",
              text: "Automated country linking for every vehicle in your fleet.",
            },
            {
              title: "Secure Access",
              icon: "🛡️",
              text: "Tiered role-based permissions to keep your data safe.",
            },
          ].map((feature, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 border-0 shadow-sm glass-panel text-center p-4">
                <Card.Body>
                  <div className="display-4 mb-3">{feature.icon}</div>
                  <Card.Title className="fw-bold h4 mb-3">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    {feature.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
