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
import { createContext, useState, useEffect } from "react";
import { checkSession } from "../api";
import { User, AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
import { createContext, useState, useContext } from "react";
import { authenticatePiUser } from "../utils/pi";
import { PiUser } from "../types/pi";

interface AuthContextType {
  user: PiUser | null;
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PiUser | null>(null);

  const login = async () => {
    const authenticatedUser = await authenticatePiUser();
    if (authenticatedUser) setUser(authenticatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
