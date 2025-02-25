export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}
