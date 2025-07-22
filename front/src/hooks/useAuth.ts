import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
}
const useAuthStore = create<AuthState>()(() => ({
  isAuth: false,
}));

export default function useAuth() {
  const { isAuth } = useAuthStore();

  return { isAuth };
}
