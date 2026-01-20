import { Form } from "react-bootstrap";

export default function SearchBar({ onSearch, value = "" }) {
  return (
    <Form className="d-flex ms-auto" style={{ maxWidth: "200px" }}>
      <Form.Control
        type="search"
        placeholder="Tìm kiếm hoa lan..."
        className="rounded-pill border-0 shadow-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  );
}
