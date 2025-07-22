import { useEffect } from "react";
import { create } from "zustand";
import type User from "../models/user";
import store from "../utils/store";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}
const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

export default function useAuth() {
  const { user, setUser } = useAuthStore();

  const getUser = () => user;
  const signIn = (user: User) => setUser(user);
  const logout = () => setUser(null);
  const isAuth = user !== null;

  useEffect(() => {
    signIn(store.load("auth"));
  }, []);

  return {
    isAuth,
    getUser,
    signIn,
    logout,
  };
}
