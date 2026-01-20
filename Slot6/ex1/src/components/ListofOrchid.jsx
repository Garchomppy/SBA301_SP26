import { Container, Row, Col } from "react-bootstrap";
import { listofOrchids } from "../data/ListofOrchid";
import Orchid from "./Orchids";
import FilterSort from "./FilterSort";
import { useMemo, useState } from "react";

export default function ListofOrchid({ orchid: searchedOrchids }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const categories = useMemo(() => {
    return [...new Set(listofOrchids.map((item) => item.category))];
  }, []);

  const displayOrchids = useMemo(() => {
    // Ưu tiên danh sách từ props (kết quả search), nếu không có dùng danh sách gốc
    let result = searchedOrchids || listofOrchids;

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
      <h2
        className="text-center fw-bold text-uppercase mb-2"
        style={{ color: "#2c3e50", letterSpacing: "2px" }}
      >
        Orchid Collection
      </h2>
      <div
        className="mx-auto mb-5"
        style={{ width: "80px", height: "4px", backgroundColor: "#17a2b8" }}
      />

      {/* Truyền các hàm cập nhật State vào FilterSort */}
      <FilterSort
        categories={categories}
        onFilterChange={setSelectedCategory}
        onSortChange={setSortOrder}
      />

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
