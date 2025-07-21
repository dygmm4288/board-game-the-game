import { Request, Response } from "express";
import { comparePassword } from "./user.logic";
import { getUser, postUser } from "./user.service";
class UserController {
  public async signUp(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) return res.status(404);

    const user = await postUser(username, password);
    if (!user) res.status(404);

    res.status(200);
  }

  public async signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await getUser(username);
    if (!user) return res.status(401);

    if (!(await comparePassword(user.password, password)))
      return res.status(401);

    const data = {
      accessToken: "",
      refreshToken: "",
    };

    return res.status(200).json(data);
  }
}

export default new UserController();
