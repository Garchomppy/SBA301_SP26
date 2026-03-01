import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  if (!token) {
    return null;
  }

  // determine role from token
  let userRole = "CUSTOMER";
  try {
    const decodeFunc = jwtDecode.default || jwtDecode;
    const decoded = decodeFunc(token);
    if (decoded.role === "ROLE_STAFF") {
      userRole = "STAFF";
    }
  } catch (e) {
    console.error("Failed to decode token", e);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2
            onClick={() =>
              navigate(userRole === "STAFF" ? "/staff/dashboard" : "/home")
            }
            style={{ cursor: "pointer", margin: 0 }}
          >
            FU MiniHotel
          </h2>
        </div>

        <ul className="nav-menu">
          {userRole === "STAFF" ? (
            <>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/staff/dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/staff/bookings")}
                >
                  Manage Bookings
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/staff/rooms")}
                >
                  Manage Rooms
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/staff/customers")}
                >
                  Manage Customers
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/home")}>
                  Trang chủ
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/bookings/create")}
                >
                  Đặt phòng
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/bookings/history")}
                >
                  Lịch sử đặt phòng
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => navigate("/profile")}
                >
                  Hồ sơ
                </button>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="nav-link logout" onClick={handleLogout}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
