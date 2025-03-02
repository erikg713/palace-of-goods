import { User } from "./user"; // Ensure correct import path

export interface AuthContextType {
  user: User | null; // Stores authenticated user
  setUser: (user: User | null) => void; // Updates user state
  logout: () => void; // Logs out user
  isAuthenticated: boolean; // Boolean flag for easier auth checks
}
