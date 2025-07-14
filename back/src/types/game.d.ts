import { GAME_STATUS } from "../modules/game/constants";

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export type GameMap = {
  players: Player;
  stacks: Stack;
};
