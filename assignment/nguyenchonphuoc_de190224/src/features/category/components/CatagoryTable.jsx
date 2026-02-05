// src/features/category/CategoryTable.jsx
import { Table, Button, Badge } from "react-bootstrap";
import {
  ArrowReturnRight,
  PencilSquare,
  TrashFill,
} from "react-bootstrap-icons";

export default function CategoryTable({
  categories,
  allCategories,
  onEdit,
  onDelete,
}) {
  // Hàm tìm tên danh mục cha
  const getParentName = (cat) => {
    if (cat.parentCategory) return cat.parentCategory.categoryName;
    return "—";
  };

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead className="table-dark">
        <tr>
          <th style={{ width: "80px" }} className="text-center">
            #
          </th>
          <th>Tên danh mục</th>
          <th>Mô tả</th>
          <th>Danh mục</th>
          <th style={{ width: "140px" }} className="text-center">
            Trạng thái
          </th>
          <th style={{ width: "180px" }} className="text-center">
            Thao tác
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-5 text-muted">
              Chưa có danh mục nào
            </td>
          </tr>
        ) : (
          categories.map((cat, index) => (
            <tr key={cat.categoryId}>
              <td className="text-center">{index + 1}</td>
              <td className="fw-medium">
                {cat.parentCategory && (
                  <ArrowReturnRight className="me-2 text-muted" />
                )}
                {cat.categoryName}
              </td>
              <td>{cat.categoryDescription || "—"}</td>
              <td>{getParentName(cat)}</td>
              <td className="text-center">
                <Badge
                  bg={cat.isActive === true ? "success" : "secondary"}
                  className="px-3 py-2"
                >
                  {cat.isActive === true ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => onEdit(cat.categoryId)}
                  >
                    <PencilSquare /> Sửa
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(cat.categoryId)}
                  >
                    <TrashFill /> Xóa
                  </Button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
