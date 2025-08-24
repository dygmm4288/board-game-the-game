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
