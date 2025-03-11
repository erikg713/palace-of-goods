import { User } from "../models/user"; // Ensure correct import path

export interface AuthContextType {
  user: User | null; // Stores authenticated user data
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update user state
  logout: () => void; // Function to log out user
  isAuthenticated: boolean; // Derived authentication state (computed from `user !== null`)
}
