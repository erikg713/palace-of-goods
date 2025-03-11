import React, { useEffect, useState, useContext } from "react";
import { Pi } from "pi-sdk"; // Ensure you have the correct Pi SDK installed
import { AuthContext } from "../context/AuthContext";

const PiAuth: React.FC = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Pi.init({ version: "2.0", sandbox: true }); // Set sandbox to false for mainnet
  }, []);

  const handlePiLogin = async () => {
    setLoading(true);
    try {
      const scopes = ["username", "payments"];
      const userData = await Pi.authenticate(scopes);
      login(userData); // Save user data in AuthContext
      alert(`Logged in as ${userData.username}`);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handlePiLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login with Pi Network"}
        </button>
      )}
    </div>
  );
};

export default PiAuth;
