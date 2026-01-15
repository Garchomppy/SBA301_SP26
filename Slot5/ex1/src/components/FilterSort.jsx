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
    <Form className="d-flex justify-content-between mb-4 w-50 mx-auto">
      <Form.Group controlId="categoryFilter">
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Select onChange={handleFilterChange} defaultValue="">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="sortOrder">
        <Form.Label>Sort by Name:</Form.Label>
        <Form.Select onChange={handleSortChange} defaultValue="asc">
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
          <option value="normal">Price highest</option>
          <option value="normal">Price lowest</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
