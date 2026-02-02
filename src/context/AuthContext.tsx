import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
  // const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate login logic
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          // password,
          // role: 'admin',
          token: data.access_token
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Update user in localStorage with fakeUser);
        setError(null);
        // navigate('/');
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
