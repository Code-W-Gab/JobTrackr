import { getMe } from "../service/authService";
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { IUser } from "../types/authTypes";

// Define the context value type
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface authProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: authProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMe();
      const data = res.data?.data|| null;
      console.log(data)
      setUser(data);
    } catch (error) {
      setError("Failed to fetch user");
      if (error instanceof Error) {
        console.error("Error fetching user:", error.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};