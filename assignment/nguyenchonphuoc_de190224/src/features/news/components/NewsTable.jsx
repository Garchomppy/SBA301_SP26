// src/features/news/NewsTable.jsx (cập nhật)
import { Table, Button, Badge } from "react-bootstrap";
import { EyeFill, PencilSquare, TrashFill } from "react-bootstrap-icons";

export default function NewsTable({ newsList, onView, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Tiêu đề</th>
          <th>Headline</th>
          <th>Danh mục</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th>Người tạo</th>
          <th>Ngày sửa</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {newsList.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.newsTitle}</td>
            <td>{item.headline || "-"}</td>
            <td>{item.categoryName}</td>
            <td>
              <Badge bg={item.newsStatus === 1 ? "success" : "danger"}>
                {item.newsStatus === 1 ? "Hiện" : "Ẩn"}
              </Badge>
            </td>
            <td>{item.createdDate}</td>
            <td>{item.createdByName}</td>
            <td>{item.modifiedDate || "-"}</td>
            <td>
              <Button
                variant="outline-info"
                size="sm"
                className="me-1"
                onClick={() => onView?.(item.id)}
              >
                <EyeFill />
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-1"
                onClick={() => onEdit(item.id)}
              >
                <PencilSquare />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(item.id)}
              >
                <TrashFill />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
