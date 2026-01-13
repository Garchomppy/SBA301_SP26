import { Container, Row, Col } from "react-bootstrap";
import { listofOrchids } from "../data/ListofOrchid";
import Orchid from "./Orchid";

export default function ListofOrchid() {
  return (
    <Container className="py-5">   
      <h2
        className="mb-4 text-center fw-bold text-uppercase"
        style={{ color: "#2c3e50" }}
      >
        Orchid Collection
      </h2>
      <hr
        className="mb-5"
        style={{
          width: "100px",
          margin: "auto",
          borderTop: "3px solid #17a2b8",
        }}
      />

      <Row>
        {listofOrchids.map((orchid) => (
          <Col xs={12} md={6} lg={3} key={orchid.id} className="mb-4">
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
