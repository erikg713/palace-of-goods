import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateAdminRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (auth?.loading) {
    return <p>Loading...</p>; // You can replace this with a spinner or loader component
  }

  // Redirect to login if the user is not authenticated
  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to the dashboard if the user is not an admin
  return auth.user.role === "admin" ? children : <Navigate to="/dashboard" replace />;
};

export default PrivateAdminRoute;
