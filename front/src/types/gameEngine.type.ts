import User from "../models/user";

export type GAME_STATUS = {
  WAITING: "waiting";
  IN_PROGRESS: "in-progress";
  FINISHED: "finished";
};

export const GAME_KIND = {
  THE_GAME: "the-game",
} as const;

export type GameKind = (typeof GAME_KIND)[keyof typeof GAME_KIND];

export interface GameEngine {
  id: string;
  status: GAME_STATUS;

  players: User[];

  gameInfo: string;
  kind: GameKind;

  createdAt: string;
  updatedAt: string;
}
