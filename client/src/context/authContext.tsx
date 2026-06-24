import { getMe } from "../service/authService";
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { IUser } from "../types/authTypes";

// Define the context value type
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface authProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: authProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMe();
        const data = res.data|| null;
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

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within authProvider");
  }
  return context;
};