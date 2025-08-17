import type { GameEngine } from "./gameEngine.type";

export interface User {
  id: string;
  created_at: string;
  name: string;
  game: GameEngine | null;
}
