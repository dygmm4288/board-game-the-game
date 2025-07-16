import { uniqueId } from "lodash";
import { GameStatus } from "../../types/game";
import { STACK_DIRECTION } from "./constants";

export type Direction = (typeof STACK_DIRECTION)[keyof typeof STACK_DIRECTION];

export interface Card {
  value: number;
}
export interface Stack {
  id: string;
  direction: Direction;
  cards: number[];
}

export interface Player {
  id: string;
  name: string;
  hand: number[];
}

export interface Game {
  id: string;
  createdAt: Date;
  status: GameStatus;
  players: Player[];
  stacks: Stack[];
  deck: number[];
  currentTurn: number;
  dropCardCount: number;
}

export const createGame = (players: Player[]): Game => {
  return {
    id: uniqueId(),
    createdAt: new Date(),
    status: "waiting",
    deck: [],
    stacks: [],
    currentTurn: -1,
    dropCardCount: -1,
    players,
  };
};

export const createPlayer = (players: Omit<Player, "hand">[]) => {
  return players.map((player) => ({ ...player, hand: [] }));
};
