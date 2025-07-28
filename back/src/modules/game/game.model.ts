import { Player } from "../game-engine/game-engine.model";
import { STACK_DIRECTION } from "./constants";

export type Direction = (typeof STACK_DIRECTION)[keyof typeof STACK_DIRECTION];

export interface Stack {
  id: string;
  direction: Direction;
  cards: number[];
}

export interface GamePlayer extends Player {
  hand: number[];
  handCnt?: number;
}

export interface TheGame {
  players: Player[];
  stacks: Stack[];
  deck: number[];
  currentTurn: number;
  dropCardCount: number;
}

export const createTheGame = (players: Player[]): TheGame => {
  return {
    deck: [],
    stacks: [],
    currentTurn: -1,
    dropCardCount: -1,
    players,
  };
};

export const createPlayer = (players: Omit<GamePlayer, "hand">[]) => {
  return players.map((player) => ({ ...player, hand: [] }));
};
