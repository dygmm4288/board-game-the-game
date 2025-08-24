import Base from "./base";
import type Stack from "./room";
import type User from "./user";

export default class Game extends Base {
  status: "waiting" | "in-progress" | "finished";
  deck: number[];
  stacks: Stack[];
  currentTurn: number;
  dropCardCount: number;
  players: User[];

  constructor(data: Game) {
    super(data as Base);
    this.status = data.status;
    this.deck = data.deck;
    this.stacks = data.stacks;
    this.currentTurn = data.currentTurn;
    this.dropCardCount = data.dropCardCount;
    this.players = data.players;
  }

  static create(data: Game | Game[]) {
    if (Array.isArray(data)) return data.map((v) => new Game(v));
    return new Game(data);
  }
}
