import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkSession } from "../api"; // Function that verifies session
import { authenticatePiUser } from "../utils/pi"; // For Pi Network authentication
import { User, AuthContextType } from "../types/auth"; // Type Definitions

// **Define AuthContext**
const AuthContext = createContext<AuthContextType | null>(null);

// **AuthProvider Component**
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // **Persist Session on Reload**
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

  // **Login Function**
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // **Logout Function**
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  // **Pi Network Authentication**
  const loginWithPi = async () => {
    try {
      const piUser = await authenticatePiUser();
      if (piUser) setUser(piUser);
    } catch (error) {
      console.error("Pi Network Authentication failed:", error);
    }
  };

  // **Check if User is Admin or Seller**
  const isAdmin = user?.role === "admin" || user?.role === "seller";

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithPi, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// **Custom Hook to Use Auth Context**
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
import React, { createContext, useState, ReactNode } from "react";

interface User {
  username: string;
  profile_pic?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
