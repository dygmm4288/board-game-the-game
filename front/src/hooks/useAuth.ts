import { useEffect } from "react";
import { create } from "zustand";
import type User from "../models/user";
import store, { ACCESS_TOKEN_KEY, USER_KEY } from "../utils/store";

export type WithOutPasswordUser = Omit<User, "password">;
interface AuthState {
  user: WithOutPasswordUser | null;
  setUser: (user: WithOutPasswordUser | null) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user: WithOutPasswordUser | null) => set({ user }),
}));

export default function useAuth() {
  const { user, setUser } = useAuthStore();

  const getUser = () => user;
  const signIn = (user: WithOutPasswordUser, accessToken: string) => {
    store.save(USER_KEY, JSON.stringify(user));
    store.save(ACCESS_TOKEN_KEY, accessToken);
    setUser(user);
  };
  const logout = () => {
    store.delete(USER_KEY);
    store.delete(ACCESS_TOKEN_KEY);
    setUser(null);
  };
  const isAuth = user !== null;

  useEffect(() => {
    signIn(store.load(USER_KEY), store.load(ACCESS_TOKEN_KEY));
  }, []);

  return {
    isAuth,
    getUser,
    signIn,
    logout,
  };
}
