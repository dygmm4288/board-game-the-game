import { useState, type ChangeEvent, type FormEvent } from "react";
import { auth } from "../api/services";
import User from "../models/user";
import store from "../utils/store";
type Form = {
  name: string;
  pwd: string;
  confirmPwd: string;
};
export default function useLoginForm({ type }: { type: "login" | "signup" }) {
  const [loginForm, setLoginForm] = useState<Form>({
    name: "",
    pwd: "",
    confirmPwd: "",
  });
  const [error, setError] = useState<Form>({
    name: "",
    pwd: "",
    confirmPwd: "",
  });

  const handleChange =
    <K extends keyof Form>(field: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginForm((state) => ({ ...state, [field]: e.target.value }));
    };

  const handleSubmit = () => (type === "login" ? handleLogin : handleSignup);

  const validate = (): string | null => {
    return null;
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;

    auth
      .post(loginForm)
      .then((res) => User.create(res.data) as User)
      .then((res) => {
        store.save("auth", res);
      });
  };

  return {
    handleChange,
    handleSubmit,
    loginForm,
    error,
  };
}
