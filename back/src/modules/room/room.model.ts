import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseModel } from "../base/base.model";
import { GameEngineModel } from "../gameEngine/gameEngine.model";
import { UserModel } from "../user/user.model";

@Entity({ name: "room" })
export class RoomModel extends BaseModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => UserModel, { eager: false, nullable: false })
  @Index()
  author!: UserModel;

  @Column({ type: "int", default: 4 })
  capacity!: number;

  @Column({ type: "text", nullable: true, unique: true })
  slug!: string | null;

  @OneToOne(() => GameEngineModel, { eager: true, cascade: ["insert"] })
  @JoinColumn({ name: "game_engine_id" })
  game!: GameEngineModel;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
