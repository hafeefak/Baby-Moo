import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../../Utils/Auth"; // adjust path if needed

const Adminprotect = ({ children }) => {
  // ✅ Check: must be logged in AND must be admin
  const allowed = isAuthenticated() && isAdmin();

  return allowed ? children : <Navigate to="/adminlogin" replace />;
};

export default Adminprotect;
