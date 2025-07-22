import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useLoginForm from "../hooks/useLoginForm";

type Props = {
  type: "login" | "signup";
};

export default function Login({ type }: Props) {
  const { loginForm, handleSubmit } = useLoginForm({ type });

  return (
    <Container p='5'>
      <Flex direction='column' gap='2'>
        <Heading>로그인</Heading>
        <form onSubmit={handleSubmit}>
          <Flex as='div' direction='column' gap='5'>
            <Box>
              <Text as='label' htmlFor='name'>
                닉네임
              </Text>
              <TextField.Root
                type='text'
                id='name'
                value={loginForm.name}
                placeholder='닉네임을 입력하세요'
              />
            </Box>
            <Box>
              <Text as='label' htmlFor='password'>
                비밀번호
              </Text>
              <TextField.Root
                id='password'
                type='password'
                value={loginForm.pwd}
                placeholder='비밀번호를 입력하세요'
              />
            </Box>
            {type === "signup" && (
              <Box>
                <Text as='label' htmlFor='password-confirm'>
                  비밀번호 확인
                </Text>
                <TextField.Root
                  id='password-confirm'
                  type='password'
                  value={loginForm.confirmPwd}
                  placeholder='비밀번호를 다시 입력하세요'
                />
              </Box>
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
