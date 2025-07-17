import { Request, Response } from "express";
import { Player } from "./game.model";
import { GameService } from "./game.service";

class GameController {
  public async createGame(req: Request, res: Response) {
    const players: Omit<Player, "hand">[] = [{ id: "p1", name: "p1" }];
    const playerId = "p1";
    const game = GameService.setupNewGame(players);

    res.status(200).json(game);
  }
}

export default new GameController();
