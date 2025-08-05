import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hide } from "../../utils/serializer";
import { BaseModel } from "../base/base.model";
import { GameModel } from "../gameEngine/gameEngine.model";
import { hashPassword } from "./user.logic";

@Entity("users")
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  @Hide()
  password!: string;

  @ManyToOne(() => GameModel, (game) => game.players, { nullable: true })
  @JoinColumn()
  game: GameModel | null = null;

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
