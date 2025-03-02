import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { Pi } from "pi-sdk";
import { AuthContext } from "../context/AuthContext";

const PiAuth: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Pi.init({ version: "2.0", sandbox: true }); // Set sandbox to false for mainnet
  }, []);

  const handlePiLogin = async () => {
    setLoading(true);
    try {
      const scopes = ["username", "payments"];
      const user = await Pi.authenticate(scopes);
      setUser(user);
      alert(`Logged in as ${user.username}`);
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handlePiLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Pi Network"}
      </button>
    </div>
  );
};

export default PiAuth;
const PiAuth = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Pi</button>
      )}
    </div>
  );
};

export default PiAuth;
