import useLoginForm from "../hooks/useLoginForm";

type Props = {
  type: "login" | "signup";
};

export default function Login({ type }: Props) {
  const { loginForm, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(type)}>
      <input type='text' value={loginForm.name} />
      <input type='password' value={loginForm.pwd} />
      {type === "signup" && (
        <input type='password' value={loginForm.confirmPwd} />
      )}
    </form>
  );
}
