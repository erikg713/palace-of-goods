import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PiAuth from "./PiAuth"; // Ensure this component exists

const SimpleNavbar: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>
      <h1>Palace of Goods</h1>
      {user ? <p>Welcome, {user.username}!</p> : <PiAuth />}
    </nav>
  );
};

export default SimpleNavbar;
