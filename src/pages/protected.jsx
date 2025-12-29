import { Navigate } from "react-router-dom";

export default function PilotProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLoggedIn || role !== "pilot") {
    return <Navigate to="/pilot-login" replace />;
  }

  return children;
}
