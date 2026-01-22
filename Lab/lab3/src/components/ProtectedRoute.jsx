import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../store/login/loginReducer.js";

const ProtectedRoute = ({ children }) => {
  const [state] = useContext(LoginContext);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
