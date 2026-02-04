import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";

type User = {
  id: string;
  name: string;
  email: string;
  // password: string;
  // role: 'admin' | 'user';
  token?: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
      AuthService.login({email, password})
      .then((res) => {
        console.log("login", res)
        const user: User = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          // password,
          // role: 'admin',
          token: res.access_token
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Update user in localStorage with fakeUser);
        setError(null);
      })
      .catch(setError) // Shorthand for (e) => setError(e)
      .finally(() => setLoading(false));
  };

  const logout = () => {
    AuthService.logout()
      .then((res) => {
        console.log("Logout", res);
        setUser(null);
        localStorage.removeItem("user");
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {loading? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
