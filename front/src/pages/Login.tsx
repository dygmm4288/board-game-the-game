type Props = {
  type: "login" | "signup";
};
export default function Login({ type }: Props) {
  console.log(type);
  return <form></form>;
}
