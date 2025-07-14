// src/assets/Admin/Adminprotect.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../../Utils/Auth";

const Adminprotect = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/adminlogin" replace />;
  }
  if (!isAdmin()) {
    return <Navigate to="/" replace />; // non-admin users go to home
  }
  return <Outlet />;
};

export default Adminprotect;
