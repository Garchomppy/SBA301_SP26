import { Container, Row, Col } from "react-bootstrap";
import listofOrchidsData from "../data/listofOrchid.json";
import Orchid from "./Orchid";

export default function ListofOrchid() {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Danh sách Lan</h2>
      <Row>
        {listofOrchidsData.map((orchid) => (
          <Col md={4} key={orchid.id} className="mb-4">
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
