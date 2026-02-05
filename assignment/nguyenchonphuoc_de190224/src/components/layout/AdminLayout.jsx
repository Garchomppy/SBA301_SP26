import { Outlet } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";
import Header from "./Header.jsx";
import Sidebar from "./SideBar.jsx";

export default function AdminLayout() {
  return (
    <Stack
      direction="horizontal"
      style={{ minHeight: "100vh", alignItems: "stretch" }}
    >
      <Sidebar />
      <Stack gap={0} className="flex-grow-1">
        <Header />
        <Container fluid className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  );
}
