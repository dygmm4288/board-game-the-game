import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuth } = useAuth();
  console.log("protected route", isAuth);

  if (!isAuth) return <Navigate to='/login' />;
  return <>{children}</>;
}
