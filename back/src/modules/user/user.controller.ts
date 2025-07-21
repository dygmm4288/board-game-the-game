import { Request, Response } from "express";
import { comparePassword } from "./user.logic";
import User from "./user.service";
class UserController {
  public async signUp(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res
          .status(400)
          .json({ message: "이름과 비밀번호는 필수입니다" });

      const existUser = await User.getUser(username);
      if (existUser)
        return res
          .status(409)
          .json({ message: "이미 존재하는 사용자 이름입니다" });

      const user = await User.postUser({ name: username, password });
      if (!user) throw new Error("서버 오류 발생");
      res.status(201);
    } catch (err) {
      res.status(500).json({ message: "서버 오류 발생", err });
    }
  }

  public async signIn(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res
          .status(400)
          .json({ message: "이름과 비밀번호는 필수입니다" });

      const user = await User.getUser(username);
      if (!user)
        return res.status(401).json({ message: "인증에 실패했습니다" });

      if (!(await comparePassword(user.password, password)))
        return res.status(401).json({ message: "인증에 실패했습니다" });

      const { password: _, ..._withoutPasswordUser } = user;

      const data = {
        accessToken: "",
        refreshToken: "",
        user: _withoutPasswordUser,
      };

      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "서버 오류 발생", err });
    }
  }
}

export default new UserController();
