import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchids";
import FilterSort from "../../components/FilterSort";
import { useMemo, useState } from "react";

export default function ListofOrchid({ orchid: searchedOrchids }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const categories = useMemo(() => {
    return [...new Set(searchedOrchids.map((item) => item.category))];
  }, [searchedOrchids]);

  const displayOrchids = useMemo(() => {
    // Ưu tiên danh sách từ props (kết quả search), nếu không có dùng danh sách gốc
    let result = searchedOrchids;

    // Tiến hành Lọc (Filter)
    if (selectedCategory !== "") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Tiến hành Sắp xếp (Sort) - tạo bản sao để tránh đột biến mảng gốc
    const sortedResult = [...result].sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.orchidName.localeCompare(b.orchidName);
        case "desc":
          return b.orchidName.localeCompare(a.orchidName);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return sortedResult;
  }, [searchedOrchids, selectedCategory, sortOrder]);

  return (
    <Container className="py-5">
      <header className="text-center mb-5">
        <span
          className="text-uppercase tracking-widest text-info fw-bold mb-2 d-block"
          style={{ fontSize: "0.9rem" }}
        >
          Premium Selection
        </span>
        <h1 className="display-5 fw-bold mb-3" style={{ color: "#1a2a3a" }}>
          Orchid Collection
        </h1>
        <div
          className="mx-auto"
          style={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(to right, #17a2b8, #007bff)",
            borderRadius: "2px",
          }}
        />
      </header>

      <div className="toolbar-container bg-white p-3 mb-4 rounded-4 shadow-sm border-0 d-flex align-items-center">
        <Row className="w-100 g-3 align-items-center">
          {/* Phần bên trái: Các bộ lọc */}
          <Col xs={12} md={8} lg={9}>
            <div className="d-flex align-items-center ">
              <FilterSort
                categories={categories}
                onFilterChange={setSelectedCategory}
                onSortChange={setSortOrder}
              />
            </div>
          </Col>
        </Row>
      </div>

      <Row className="mt-4">
        {displayOrchids.length > 0 ? (
          displayOrchids.map((item) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              key={item.id}
              className="mb-4 d-flex justify-content-center"
            >
              <Orchid {...item} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4 className="text-muted">Không tìm thấy sản phẩm nào phù hợp.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
}
