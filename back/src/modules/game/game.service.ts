import { times } from "lodash";
import { GameMap } from "../../types/game";
import {
  canPlaceCard,
  dealCards,
  drawCard,
  dropCard,
  generateDeck,
  generateInitialStacks,
  getHandSize,
  getNextTurnIndex,
  isValidDropCard,
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

  endTurn(playerId: string) {
    isValidDropCard(this.game.dropCardCount, this.game.deck);

    const playerIndex = this.findPlayerIndex(playerId);

    times(this.game.dropCardCount, () => {
      const player = this.findPlayer(playerId);
      const { updatedDeck, updatedPlayer } = drawCard(this.game.deck, player);

      this.game.deck = updatedDeck;
      this.game.players[playerIndex] = updatedPlayer;
    });

    this.game.dropCardCount = 0;
    this.game.currentTurn = getNextTurnIndex(this.game);
  }

  // ----------------------
  // util
  // ----------------------
  findById<K extends keyof GameMap>(key: K, id: string): GameMap[K] {
    return this.game[key].find((v) => v.id === id);
  }

  findStack(stackId: string) {
    const stack = this.findById("stacks", stackId);
    if (!stack) throw new Error("스택이 없습니다");
    return stack;
  }
  findPlayer(playerId: string) {
    const player = this.findById("players", playerId);
    if (!player) throw new Error("플레이어가 없습니다");
    return player;
  }
  findPlayerIndex(playerId: string) {
    const player = this.game.players.findIndex(
      (player) => player.id === playerId,
    );
    if (player === -1) throw new Error("플레이어가 없습니다");
    return player;
  }
  mapBy<K extends keyof GameMap>(key: K, id: string, value: GameMap[K]) {
    return this.game[key].map((v) => (v.id === id ? value : v));
  }
}
