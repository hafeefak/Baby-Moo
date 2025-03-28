import { Navigate, Outlet } from "react-router-dom";

const Adminprotect = ({children}) => {
  const adminLogged = localStorage.getItem("adminLogged") === "true";

  return adminLogged ? children : <Navigate to="/adminlogin" />;
};

export default Adminprotect;
