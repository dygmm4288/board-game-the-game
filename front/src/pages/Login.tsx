import { Button, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LabelInput from "../components/form/LabelInput";
import useAuth from "../hooks/useAuth";
import useLoginForm from "../hooks/useLoginForm";
import { label1 } from "../styles/text.style";

type Props = {
  type: "login" | "signup";
};

export default function Login({ type }: Props) {
  const { loginForm, handleSubmit, handleChange } = useLoginForm({ type });

  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get("nextPath") ?? "/";

  useEffect(() => {
    if (isAuth) navigate(nextPath, { replace: true });
  }, [isAuth, navigate, nextPath]);

  return (
    <Container p='5'>
      <Flex direction='column' gap='2'>
        <Heading>{type === "login" ? "로그인" : "회원가입"}</Heading>
        <form onSubmit={handleSubmit}>
          <Flex as='div' direction='column' gap='5'>
            <label>
              <LabelInput
                labelStyle={label1}
                label='닉네임'
                id='name'
                value={loginForm.name}
                placeholder='닉네임을 입력하세요'
                onChange={handleChange("name")}
                type='text'
              />
            </label>

            <label>
              <LabelInput
                labelStyle={label1}
                label='비밀번호'
                id='password'
                value={loginForm.pwd}
                placeholder='비밀번호를 입력하세요'
                onChange={handleChange("pwd")}
                type='password'
              />
            </label>
            {type === "signup" && (
              <label>
                <LabelInput
                  labelStyle={label1}
                  label='비밀번호 확인'
                  id='password-confirm'
                  value={loginForm.confirmPwd}
                  placeholder='비밀번호를 다시 입력하세요'
                  onChange={handleChange("confirmPwd")}
                  type='password'
                />
              </label>
            )}
            <Flex direction='column' gap='5'>
              <Button type='submit'>
                {type === "login" ? "로그인하기" : "회원가입하기"}
              </Button>
              <Button type='button' color='blue'>
                {type === "login" ? (
                  <Link to='/signup' style={{ width: "100%" }}>
                    회원가입하러가기
                  </Link>
                ) : (
                  <Link to='/login' style={{ width: "100%" }}>
                    로그인하러가기
                  </Link>
                )}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
}
