import { Button, Container, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import LabelInput from "../components/form/LabelInput";
import useLoginForm from "../hooks/useLoginForm";

type Props = {
  type: "login" | "signup";
};

export default function Login({ type }: Props) {
  const { loginForm, handleSubmit, handleChange } = useLoginForm({ type });

  console.log(loginForm);

  return (
    <Container p='5'>
      <Flex direction='column' gap='2'>
        <Heading>{type === "login" ? "로그인" : "회원가입"}</Heading>
        <form onSubmit={handleSubmit}>
          <Flex as='div' direction='column' gap='5'>
            <LabelInput
              label='닉네임'
              id='name'
              value={loginForm.name}
              placeholder='닉네임을 입력하세요'
              onChange={handleChange("name")}
              type='text'
            />
            <LabelInput
              label='비밀번호'
              id='password'
              value={loginForm.pwd}
              placeholder='비밀번호를 입력하세요'
              onChange={handleChange("pwd")}
              type='password'
            />
            {type === "signup" && (
              <LabelInput
                label='비밀번호 확인'
                id='password-confirm'
                value={loginForm.confirmPwd}
                placeholder='비밀번호를 다시 입력하세요'
                onChange={handleChange("confirmPwd")}
                type='password'
              />
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
