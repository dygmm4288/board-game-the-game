import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameModel } from "../game-engine/game-engine.model";
import { hashPassword } from "./user.logic";

@Entity("users")
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  password!: string;

  @ManyToOne(() => GameModel, (game) => game.players)
  @JoinColumn({ name: "gameId" })
  game!: GameModel;

  @Column()
  gameId!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}

export type UserToken = {
  created_at: Date;
  id: string;
  name: string;
};
