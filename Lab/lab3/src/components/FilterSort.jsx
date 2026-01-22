//FilterSort.jsx filter all the orchids
import { Form } from "react-bootstrap";

export default function FilterSort({
  categories,
  onFilterChange,
  onSortChange,
}) {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };
  return (
    <div className="d-flex flex gap-3 align-items-center">
      {/* Filter Group */}
      <div className="input-group flex-nowrap" style={{ maxWidth: "250px" }}>
        <span className="input-group-text bg-white border-end-0 text-muted shadow-sm rounded-start-pill px-3">
          <i className="bi bi-tag-fill"></i>
        </span>
        <Form.Select
          className="border-start-0 shadow-sm rounded-end-pill py-2 ps-0 fw-medium text-secondary"
          onChange={handleFilterChange}
          defaultValue=""
          style={{ cursor: "pointer" }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>
      {/* Sort Group */}
      <div className="input-group flex-nowrap" style={{ maxWidth: "250px" }}>
        <span className="input-group-text bg-white border-end-0 text-muted shadow-sm rounded-start-pill px-3">
          <i className="bi bi-sort-down"></i>
        </span>
        <Form.Select
          className="border-start-0 shadow-sm rounded-end-pill py-2 ps-0 fw-medium text-secondary"
          onChange={handleSortChange}
          defaultValue="asc"
          style={{ cursor: "pointer" }}
        >
          <option value="asc">Name: A to Z</option>
          <option value="desc">Name: Z to A</option>
          <option value="price-high">Price: Highest First</option>
          <option value="price-low">Price: Lowest First</option>
        </Form.Select>
      </div>
    </div>
  );
}
