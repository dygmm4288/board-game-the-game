import { Response } from "express";
import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { GAME_KIND } from "../gameEngine/constants";
import { GameEngineService } from "../gameEngine/gameEngine.service";
import { UserModel } from "../user/user.model";

class TheGameController {
  public async createGame(req: AuthenticateRequest, res: Response) {
    if (!req.user) return res.status(401).json({ detail: "Unauthorized" });
    const user = req.user as UserModel;

    const gameEngineService = new GameEngineService();

    const game = await gameEngineService.createGame(user, GAME_KIND.THE_GAME);

    // BUG: game.players의 user.game이 순환해서 json으로 만드는 과정에서 오류가 발생함.
    console.log(game);
    res.status(200).json(game);
  }
}

export default new TheGameController();
