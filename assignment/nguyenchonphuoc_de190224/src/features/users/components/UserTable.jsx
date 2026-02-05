// src/features/user/UserTable.jsx
import { Table, Button, Badge, Stack } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th style={{ width: "80px" }} className="text-center">
            #
          </th>
          <th>Tên đăng nhập</th>

          <th>Email</th>
          <th>Vai trò</th>
          <th style={{ width: "160px" }} className="text-center">
            Trạng thái
          </th>
          <th style={{ width: "180px" }} className="text-center">
            Thao tác
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td className="text-center">{index + 1}</td>
            <td className="fw-medium">{user.username}</td>

            <td>{user.email}</td>
            <td>
              <Badge bg={user.role === "Admin" ? "danger" : "primary"}>
                {user.role}
              </Badge>
            </td>
            <td className="text-center">
              <Badge
                bg={user.status === 1 ? "success" : "secondary"}
                className="px-3 py-2"
              >
                {user.status === 1 ? "Hoạt động" : "Khóa"}
              </Badge>
            </td>
            <td className="text-center">
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-center"
              >
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => onEdit(user.id)}
                >
                  <PencilSquare /> Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(user.id)}
                  disabled={user.username === "Admin"} // Không cho xóa Admin
                >
                  <TrashFill /> Xóa
                </Button>
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
