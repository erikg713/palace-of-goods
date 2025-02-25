import { createContext, useState, useEffect } from "react";
import { checkSession } from "../api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await checkSession();
        setUser(data);
      } catch {
        logout();
      }
    };

    verifySession();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};
