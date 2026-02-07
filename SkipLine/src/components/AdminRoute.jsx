import { Navigate } from "react-router-dom";

export default function AdminRoute({ isAdmin, children }) {
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}
