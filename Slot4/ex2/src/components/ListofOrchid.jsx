import { Container, Row, Col } from "react-bootstrap";
import { listofOrchids } from "../data/ListofOrchid";
import Orchid from "./Orchids";
import FilterSort from "./FilterSort";
import { useState } from "react";
import Headers from "./Header";

export default function ListofOrchid() {
  const categories = [
    ...new Set(listofOrchids.map((orchid) => orchid.category)),
  ];
  const [filteredOrchids, setFilteredOrchids] = useState(listofOrchids);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (category) => {
    if (category === "") {
      setFilteredOrchids(listofOrchids);
    } else {
      setFilteredOrchids(
        listofOrchids.filter((orchid) => orchid.category === category)
      );
    }
  };

  const sortMethods = {
    asc: (a, b) => a.orchidName.localeCompare(b.orchidName),
    desc: (a, b) => b.orchidName.localeCompare(a.orchidName),
    normal: (a, b) => b.price - a.price,
    normal: (a, b) => a.price - b.price,
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredOrchids].sort(sortMethods[order]);
    setFilteredOrchids(sorted);
  };

  const handleSearchChange = (query) => {
    const searched = listofOrchids.filter((orchid) =>
      orchid.orchidName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrchids(searched);
  };

  return (
    <Container>
      <h2
        className="text-center fw-bold text-uppercase py-5"
        style={{ color: "#2c3e50" }}
      >
        Orchid Collection
      </h2>

      <FilterSort
        categories={categories}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <hr
        className="mb-5"
        style={{
          width: "100px",
          margin: "auto",
          borderTop: "3px solid #17a2b8",
        }}
      />

      <Row>
        {filteredOrchids.map((orchid) => (
          <Col xs={12} md={6} lg={3} key={orchid.id} className="mb-4">
            <Orchid {...orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
