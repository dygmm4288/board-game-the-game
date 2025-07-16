import { times } from "lodash";
import { GameMap } from "../../types/game";
import { GAME_FIND_ERROR_MAP } from "./constants";
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
  isValidPlayer,
  isWinGame,
  shuffleDeck,
} from "./game.logic";
import { createGame, createPlayer, Game, Player } from "./game.model";

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

    const player = this.findById("players", playerId);
    const stack = this.findById("stacks", stackId);

    isValidPlayer(this.game, playerId);

    if (!player.hand.includes(card))
      throw new Error("존재하지 않은 카드입니다");
    if (!canPlaceCard(stack, card)) throw new Error("카드를 올릴 수 없습니다");

    const { updatedPlayer, updatedStack } = dropCard(player, stack, card);

    this.game.players = this.mapBy("players", playerId, updatedPlayer);
    this.game.stacks = this.mapBy("stacks", stackId, updatedStack);

    this.game.dropCardCount = this.game.dropCardCount + 1;
  }

  endTurn(playerId: string) {
    isValidPlayer(this.game, playerId);
    isValidDropCard(this.game.dropCardCount, this.game.deck);

    const playerIndex = this.findByIndex("players", playerId);

    times(this.game.dropCardCount, () => {
      const player = this.findById("players", playerId);
      const { updatedDeck, updatedPlayer } = drawCard(this.game.deck, player);

      this.game.deck = updatedDeck;
      this.game.players[playerIndex] = updatedPlayer;
    });

    this.game.dropCardCount = 0;
    if (isWinGame(this.game)) this.game.status = "finished";
    else {
      const nextTurn = getNextTurnIndex(this.game);
      if (nextTurn !== -1) this.game.currentTurn = nextTurn;
    }
  }
  // ----------------------
  // static methods
  // ----------------------
  static setupNewGame(playerInfos: Omit<Player, "hand">[]): GameService {
    const players = createPlayer(playerInfos);
    const game = createGame(players);

    return new GameService(game);
  }

  // ----------------------
  // util
  // ----------------------
  findBy<K extends keyof GameMap>(key: K) {
    return this.game[key].find.bind(this.game[key]);
  }

  findById<K extends keyof GameMap>(key: K, id: string): GameMap[K] {
    const value = this.findBy(key)((v) => v.id === id);
    if (!value) throw new Error(GAME_FIND_ERROR_MAP[key]);
    return value;
  }

  findByIndex<K extends keyof GameMap>(key: K, id: string) {
    const index = this.game[key].findIndex((value) => value.id === id);
    if (index === -1) throw new Error(GAME_FIND_ERROR_MAP[key]);
    return index;
  }

  mapBy<K extends keyof GameMap>(key: K, id: string, value: GameMap[K]) {
    return this.game[key].map((v) => (v.id === id ? value : v));
  }
}
