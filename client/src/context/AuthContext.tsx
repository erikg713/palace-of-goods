import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkSession } from "../api"; 
import { authenticatePiUser } from "../utils/pi"; 
import { User, AuthContextType } from "../types/auth"; 

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
    };import { User } from "../models/user"; // Ensure correct import path

export interface AuthContextType {
  user: User | null; // Stores authenticated user data
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update user state
  logout: () => void; // Function to log out user
  isAuthenticated: boolean; // Derived authentication state (computed from `user !== null`)
}
    verifySession();
  }, []);

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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const loginWithPi = async () => {
    try {
      const piUser = await authenticatePiUser();
      if (piUser) {
        setUser(piUser);
        localStorage.setItem("user", JSON.stringify(piUser));
      }
    } catch (error) {
      console.error("Pi Network Authentication failed:", error);
    }
  };

  const isAdmin = user?.role === "admin" || user?.role === "seller";

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithPi, isAdmin }}>
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

import { createContext, useState } from "react";
import { AuthContextType } from "../types/authTypes";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
