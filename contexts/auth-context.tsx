// contexts/auth-context.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, type User } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Salva o token tanto no localStorage quanto no cookie httpOnly (lido pelo proxy)
async function persistToken(token: string) {
  localStorage.setItem("previsia_token", token);
  await fetch("/api/auth/set-cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
}

// Remove de ambos os lugares
async function clearToken() {
  localStorage.removeItem("previsia_token");
  await fetch("/api/auth/logout", { method: "POST" });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("previsia_token");
      if (token) {
        try {
          // Garante que o cookie existe (caso tenha expirado o cookie mas não o localStorage)
          await fetch("/api/auth/set-cookie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const userData = await api.getMe();
          setUser(userData);
        } catch {
          // Token inválido — limpa tudo
          await clearToken();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { access_token } = await api.login(email, password);
    await persistToken(access_token);
    const userData = await api.getMe();
    setUser(userData);
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    await api.register(email, password, fullName);
    await login(email, password);
  };

  const logout = () => {
    clearToken(); // fire-and-forget tá ok aqui
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
