import Base from "./base";

export default class Stack extends Base {
  direction: "asc" | "desc";
  cards: number[];

  constructor(data: Stack) {
    super();
    this.direction = data.direction;
    this.cards = data.cards;
  }

  static create(data: Stack | Stack[]) {
    if (Array.isArray(data)) return data.map((v) => new Stack(v));
    return new Stack(data);
  }
}
