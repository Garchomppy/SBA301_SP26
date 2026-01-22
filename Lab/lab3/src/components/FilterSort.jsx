// src/components/FilterSort.jsx
import { Form, Button, InputGroup } from "react-bootstrap";

export default function FilterSort({
  categories,
  onFilterChange,
  onSortChange,
  searchQuery = "", // Thêm props để truyền searchQuery
  onSearchChange, // Hàm xử lý thay đổi search
  onClearAll, // Hàm xóa toàn bộ filter + search
}) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center">
      {/* Thanh tìm kiếm */}
      <div className="flex-grow-1">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên orchid..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-pill py-2 ps-4 shadow-sm border-0 bg-light"
        />
      </div>

      {/* Filter + Sort + Clear Button */}
      <div className="d-flex flex-wrap gap-3 align-items-center">
        {/* Filter by Category */}
        <InputGroup style={{ width: "220px" }}>
          <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
            <i className="bi bi-tags fs-5 text-muted"></i>
          </InputGroup.Text>
          <Form.Select
            value={categories.includes("") ? "" : categories[0]} // default ""
            onChange={handleFilterChange}
            className="border-start-0 rounded-end-pill shadow-sm py-2"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </InputGroup>

        {/* Sort */}
        <InputGroup style={{ width: "220px" }}>
          <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
            <i className="bi bi-arrow-down-up fs-5 text-muted"></i>
          </InputGroup.Text>
          <Form.Select
            defaultValue="asc"
            onChange={handleSortChange}
            className="border-start-0 rounded-end-pill shadow-sm py-2"
          >
            <option value="asc">Tên: A → Z</option>
            <option value="desc">Tên: Z → A</option>
            <option value="price-high">Giá: Cao → Thấp</option>
            <option value="price-low">Giá: Thấp → Cao</option>
          </Form.Select>
        </InputGroup>

        {/* Nút Xóa bộ lọc */}
        <Button
          variant="outline-danger"
          size="sm"
          className="rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          onClick={onClearAll}
        >
          <i className="bi bi-x-circle"></i>
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
}
