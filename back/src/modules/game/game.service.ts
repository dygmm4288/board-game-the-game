import { GameMap } from "../../types/game";
import {
  canPlaceCard,
  dealCards,
  dropCard,
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
    this.game.dropCardCount = 0;
  }

  playCard(stackId: string, playerId: string, card: number): void {
    if (this.game.status !== "in-progress")
      throw new Error("플레이 중이 아닙니다");

    const player = this.findPlayer(playerId);
    const stack = this.findStack(stackId);

    if (!player.hand.includes(card))
      throw new Error("존재하지 않은 카드입니다");
    if (!canPlaceCard(stack, card)) throw new Error("카드를 올릴 수 없습니다");

    const { updatedPlayer, updatedStack } = dropCard(player, stack, card);

    this.game.players = this.mapBy("players", playerId, updatedPlayer);
    this.game.stacks = this.mapBy("stacks", stackId, updatedStack);

    this.game.dropCardCount = this.game.dropCardCount + 1;
  }
  endTurn(playerId: string) {}

  // ----------------------
  // util
  // ----------------------
  findBy<K extends keyof GameMap>(key: K, id: string): GameMap[K] {
    return this.game[key].find((v) => v.id === id);
  }

  findStack(stackId: string) {
    const stack = this.findBy("stacks", stackId);
    if (!stack) throw new Error("스택이 없습니다");
    return stack;
  }
  findPlayer(playerId: string) {
    const player = this.findBy("players", playerId);
    if (!player) throw new Error("플레이어가 없습니다");
    return player;
  }
  mapBy<K extends keyof GameMap>(key: K, id: string, value: GameMap[K]) {
    return this.game[key].map((v) => (v.id === id ? value : v));
  }
}
