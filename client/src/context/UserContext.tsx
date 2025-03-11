import { createContext, useState, useEffect, ReactNode } from "react";
import { getUserProfile } from "../api";

interface User {
  id: string;
  username: string;
  email: string;
  profile_pic?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {}, // No-op function to avoid undefined errors
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading ? children : <p>Loading user...</p>}
    </UserContext.Provider>
  );
};
