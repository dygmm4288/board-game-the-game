import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/middleware";
import { GAME_KIND } from "../gameEngine/constants";
import { GameEngineService } from "../gameEngine/gameEngine.service";
import { UserModel } from "../user/user.model";

class TheGameController {
  public createGame = asyncHandler(async (req: AuthenticateRequest) => {
    const user = req.user as UserModel;

    const gameEngineService = new GameEngineService();

    const game = await gameEngineService.createGame(user, GAME_KIND.THE_GAME);

    return game;
  });
}

export default new TheGameController();
