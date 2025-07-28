import { Response } from "express";
import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { UserModel } from "../user/user.model";
import { GameService } from "./game.service";

class TheGameController {
  public async createGame(req: AuthenticateRequest, res: Response) {
    if (!req.user) return res.status(401).json({ detail: "Unauthorized" });
    const user = req.user as UserModel;

    const game = new GameService();

    await game.createGame(user);

    res.status(200).json(game);
  }
}

export default new TheGameController();
