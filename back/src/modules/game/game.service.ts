import {
  dealCards,
  generateDeck,
  generateInitialStacks,
  getHandSize,
  shuffleDeck,
} from "./game.logic";
import { Game } from "./game.model";

export class GameService {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  startGame(): void {
    const deck = shuffleDeck(generateDeck());
    const stacks = generateInitialStacks();
    const handSize = getHandSize(this.game.players);
    const [playersWithHands, remainingDeck] = dealCards(
      deck,
      this.game.players,
      handSize,
    );

    this.game.deck = remainingDeck;
    this.game.players = playersWithHands;
    this.game.currentTurn = 0;
    this.game.status = "in-progress";
    this.game.stacks = stacks;
  }
}
