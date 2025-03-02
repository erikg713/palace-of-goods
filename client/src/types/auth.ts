import { User } from "./User"; // Importing User interface

export interface AuthContextType {
  user: User | null; // Holds authenticated user data
  setUser: (user: User | null) => void; // Updates user state
  logout: () => void; // Logs out user
  isAuthenticated: boolean; // Added helper for easier checks
}
import { createContext, useState } from "react";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Example: Clearing stored auth token
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
