import { GAME_KIND, GAME_STATUS } from "../modules/game-engine/constants";
import { TheGame } from "../modules/game/game.model";

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
export type GameKind = (typeof GAME_KIND)[keyof typeof GAME_KIND];
export type GameInfoMap = {
  [GAME_KIND.THE_GAME]: TheGame;
};

export type GameMap = {
  players: Player;
  stacks: Stack;
};
