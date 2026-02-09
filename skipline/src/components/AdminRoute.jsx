import { Navigate } from "react-router-dom";

export default function AdminRoute({ isAdmin, children }) {
  if (isAdmin === null) return null; // or loader
  return isAdmin ? children : <Navigate to="/dashboard" replace />;
}
