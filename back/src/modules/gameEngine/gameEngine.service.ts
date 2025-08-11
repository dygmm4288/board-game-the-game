import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { GameKind } from "../../types/game";
import { GameEngineModel } from "../gameEngine/gameEngine.model";
import { UserModel } from "../user/user.model";

class GameEngineService {
  private gameRepository: Repository<GameEngineModel>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(GameEngineModel);
  }

  async createGame(user: UserModel, kind: GameKind): Promise<GameEngineModel> {
    const newGame = this.gameRepository.create({
      status: "waiting",
      kind,
      players: [],
    });

    newGame.players.push(user);

    await this.gameRepository.save(newGame);
    user.game = this.gameRepository.getId(newGame);
    return newGame;
  }

  async joinGame(gameId: string, user: UserModel): Promise<GameEngineModel> {
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

export default new GameEngineService();
