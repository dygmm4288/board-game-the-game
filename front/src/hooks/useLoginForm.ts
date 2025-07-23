import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../api/services";
import { getErrorMessage } from "../utils/error";
type Form = {
  name: string;
  pwd: string;
  confirmPwd: string;
};
export default function useLoginForm({ type }: { type: "login" | "signup" }) {
  const navigate = useNavigate();
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
        console.log("here");
        // TODO: Toast and redirect
        toast.success("회원가입 성공");
        navigate("/login");
      })
      .catch((err) => {
        // TODO: Sign up Error 핸들링
        toast.error(getErrorMessage(err));
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
