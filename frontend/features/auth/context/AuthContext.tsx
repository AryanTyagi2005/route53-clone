"use client";

import { createContext, useEffect, useMemo, useState } from "react";

import type { AuthContextType, AuthUser } from "../types";

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "route53-auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "password123") {
      const authUser = {
        name: "Admin User",
        email,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
