import { Request, Response } from "express";
import { AssertionError } from "../../utils/error";
import hash from "../../utils/hash";
import { asyncHandler } from "../../utils/middleware";
import { comparePassword } from "./user.logic";
import { UserToken } from "./user.model";
import User from "./user.service";
class UserController {
  public signUp = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const {
        name: username,
        pwd: password,
        confirmPwd: passwordConfirm,
      } = req.body;

      if (!username || !password)
        throw new AssertionError("이름과 비밀번호는 필수입니다", 400);
      if (password !== passwordConfirm)
        throw new AssertionError("비밀번호가 일치하지 않습니다", 400);

      const existUser = await User.getUser(username);

      if (existUser)
        throw new AssertionError("이미 존재하는 사용자입니다.", 409);

      const user = await User.postUser({ name: username, password });

      if (!user) throw new AssertionError("서버 오류 발생", 500);
    },
  );

  public signIn = asyncHandler(
    async (req: Request, res: Response): Promise<Object | void> => {
      const { name: username, pwd: password } = req.body;

      if (!username || !password)
        throw new AssertionError("이름과 비밀번호는 필수입니다", 400);

      const user = await User.getUser(username);
      if (!user) throw new AssertionError("인증에 실패했습니다", 409);

      if (!(await comparePassword(user.password, password)))
        throw new AssertionError("인증에 실패했습니다", 401);

      const { password: _, ..._withoutPasswordUser } = user;

      const data = {
        accessToken: hash.generateToken({
          ..._withoutPasswordUser,
        } as UserToken),
        // TODO : refresh token 내용 이해 후 적용
        // refreshToken: hash.generateToken({ _withoutPasswordUser }),
        user: _withoutPasswordUser,
      };

      return data;
    },
  );
}

export default new UserController();
