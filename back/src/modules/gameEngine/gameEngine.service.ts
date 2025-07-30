import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { GameKind } from "../../types/game";
import { GameModel } from "../gameEngine/gameEngine.model";
import { UserModel } from "../user/user.model";

export class GameEngineService {
  private gameRepository: Repository<GameModel>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(GameModel);
  }

  async createGame(user: UserModel, kind: GameKind): Promise<GameModel> {
    const newGame = this.gameRepository.create({
      status: "waiting",
      kind,
      players: [],
    });

    user.game = newGame;
    newGame.players.push(user);

    await this.gameRepository.save(newGame);
    return newGame;
  }

  async joinGame(gameId: string, user: UserModel): Promise<GameModel> {
    const game = await this.findGameById(gameId);

    game.players.push(user);

    return this.gameRepository.save(game);
  }

  async exitGame() {}

  private async findGameById(id: string) {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) throw new Error("게임을 찾을 수 없습니다.");
    return game;
  }
}
