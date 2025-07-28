import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GameInfoMap, GameKind, GameStatus } from "../../types/game";
import { UserModel } from "../user/user.model";
import { GAME_KIND, GAME_STATUS } from "./constants";

export interface Card {
  value: number;
}

export interface Player {
  id: string;
  name: string;
}

export interface BaseGame {
  id: string;
  players: Player[];
  status: GameStatus;
}

@Entity({ name: "games" })
export class GameModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: GAME_STATUS })
  status!: GameStatus;

  @OneToMany(() => UserModel, (user) => user.game, { eager: true })
  players!: UserModel[];

  @Column({ type: "jsonb", nullable: true })
  gameInfo: GameInfoMap[keyof GameInfoMap] | null = null;

  @Column({ type: "enum", enum: GAME_KIND })
  kind!: GameKind;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
