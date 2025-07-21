import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class GameModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "datetime", default: new Date() })
  created_at!: Date;

  @Column({ type: "varchar", default: null })
  name!: string;

  @Column({ type: "varchar", default: null })
  password!: string;
}
