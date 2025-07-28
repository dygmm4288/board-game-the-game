import { Response } from "express";
import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { Player } from "../game-engine/game-engine.model";
import { UserToken } from "../user/user.model";

class GameController {
  public async createGame(req: AuthenticateRequest, res: Response) {
    if (!req.user) return res.status(401).json({ detail: "Unauthorized" });
    const user = req.user as UserToken;

    const players: Omit<Player, "hand">[] = [{ id: user.id, name: user.name }];
    const game = TheGameService.setupNewGame(players);

    res.status(200).json(game);
  }
}

export default new GameController();
