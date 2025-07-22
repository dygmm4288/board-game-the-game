import { useState, type ChangeEvent, type FormEvent } from "react";
type Form = {
  name: string;
  pwd: string;
  confirmPwd: string;
};
export default function useLoginForm() {
  const [loginForm, setLoginForm] = useState<Form>({
    name: "",
    pwd: "",
    confirmPwd: "",
  });

  const handleChange =
    <K extends keyof Form>(field: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginForm((state) => ({ ...state, [field]: e.currentTarget.value }));
    };

  const handleSubmit = (type: "login" | "signup") =>
    type === "login" ? handleLogin : handleSignup;

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return {
    handleChange,
    handleSubmit,
    loginForm,
  };
}
