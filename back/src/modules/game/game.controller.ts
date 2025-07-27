import { Response } from "express";
import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { UserToken } from "../user/user.model";
import { Player } from "./game.model";
import { GameService } from "./game.service";

class GameController {
  public async createGame(req: AuthenticateRequest, res: Response) {
    if (!req.user) return res.status(401).json({ detail: "Unauthorized" });
    const user = req.user as UserToken;

    const players: Omit<Player, "hand">[] = [{ id: user.id, name: user.name }];
    const game = GameService.setupNewGame(players);

    res.status(200).json(game);
  }
}

export default new GameController();
