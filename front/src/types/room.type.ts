import type { GameEngine } from "../gameEngine.type";
import type User from "../models/user";

export interface Room {
  id: string;
  author: User | null;
  capacity: number;
  slug: string | null;
  game: GameEngine;
  createdAt: string;
  updatedAt: string;
}
