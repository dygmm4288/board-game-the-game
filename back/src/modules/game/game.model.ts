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
}
