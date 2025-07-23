import { uniqueId } from "lodash";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  handCnt?: number;
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

@Entity("games")
export class GameModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "varchar", default: "waiting" })
  status!: "waiting" | "in-progress" | "finished";

  @Column({ type: "integer", default: () => "ARRAY[]::integer[]", array: true })
  deck?: number[];

  @Column({ type: "jsonb", default: () => "'[]'" })
  stacks?: Stack[];

  @Column({ type: "integer", default: -1 })
  currentTurn?: number;

  @Column({ type: "integer", default: -1 })
  dropCardCount?: number;

  @Column({ type: "integer", default: null, array: true })
  players?: number[];
}
