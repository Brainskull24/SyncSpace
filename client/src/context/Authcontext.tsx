"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

const UserContext = createContext<{
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
}>({
  user: null,
  loading: true,
  setUser: () => {},
});

import { ReactNode } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
