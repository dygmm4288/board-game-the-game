import { useState, type ChangeEvent, type FormEvent } from "react";
import { auth } from "../api/services";
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

  const validate = (): string | null => {
    // TODO: 유효성 내용 추가
    return null;
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;

    auth
      .signIn(loginForm)
      .then((res) => {
        // TODO : User token 저장
      })
      .catch((err) => {
        // TODO: SingIn Error 핸들링
      });
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;

    auth
      .singUp(loginForm)
      .then(() => {
        // TODO: Toast and redirect
      })
      .catch((err) => {
        // TODO: Sign up Error 핸들링
      });
  };

  const handleSubmit = type === "login" ? handleLogin : handleSignup;

  return {
    handleChange,
    handleSubmit,
    loginForm,
    error,
  };
}
