import z from "zod";
import type { GameEngine } from "../types/gameEngine.type";
import Base from "./base";
import type User from "./user";

export default class Room extends Base {
  author: User;
  capacity: number;
  slug: string | null;
  game: GameEngine;
  updatedAt: Date;

  constructor(data: Room) {
    super(data as Base);
    this.author = data.author;
    this.capacity = data.capacity;
    this.slug = data.slug;
    this.game = data.game;
    this.updatedAt = data.updatedAt;
  }

  static create(data: Room | Room[]) {
    if (Array.isArray(data)) return data.map((v) => new Room(v));
    return new Room(data);
  }
}

export const CreateRoomSchema = z.object({
  kind: z.enum(["the-game"], { error: "올바르지 않은 게임 종류입니다" }),
  capacity: z
    .number()
    .int({ error: "인원을 선택해 주세요" })
    .min(1, { error: "최소 1명은 있어야 합니다" })
    .max(5, { error: "최대 5명까지 가능합니다" }),
  slug: z
    .string({ error: "방 이름을 입력해 주세요" })
    .trim()
    .min(3, { error: "방 이름이 너무 짧습니다 " })
    .max(64, { error: "방 이름이 너무 깁니다" }),
});

export type CreateRoomPayload = z.infer<typeof CreateRoomSchema>;
