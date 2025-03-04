import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateAdminRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.user?.role === "admin" ? children : <Navigate to="/dashboard" />;
};

export default PrivateAdminRoute;
