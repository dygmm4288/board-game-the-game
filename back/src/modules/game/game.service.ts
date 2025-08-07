import { times } from "lodash";
import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { GameStatus } from "../../types/game";
import { GameEngineModel } from "../gameEngine/gameEngine.model";
import {
  canPlaceCard,
  dealCards,
  drawCard,
  dropCard,
  generateDeck,
  generateInitialStacks,
  getHandSize,
  getNextTurnIndex,
  isLoseGame,
  isValidDropCard,
  isValidPlayer,
  isWinGame,
  shuffleDeck,
} from "./game.logic";
import { TheGame } from "./game.model";

export class GameService {
  private gameRepository: Repository<GameEngineModel>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(GameEngineModel);
  }

  async exitGame() {}

  async startGame(gameId: string): Promise<GameEngineModel> {
    const gameModel = await this.findGameById(gameId);
    const gameInfo = gameModel.gameInfo as TheGame;

    const deck = shuffleDeck(generateDeck());
    const stacks = generateInitialStacks();
    const handSize = getHandSize(gameInfo.players);
    const [playersWithHands, remainingDeck] = dealCards(
      deck,
      gameInfo.players,
      handSize,
    );

    gameModel.gameInfo = {
      ...gameInfo,
      deck: remainingDeck,
      players: playersWithHands,
      currentTurn: 0,
      stacks: stacks,
      dropCardCount: 0,
    };
    gameModel.status = "in-progress" as GameStatus;

    return this.gameRepository.save(gameModel);
  }

  async playCard(
    gameId: string,
    stackId: string,
    playerId: string,
    card: number,
  ): Promise<GameEngineModel> {
    const gameModel = await this.findGameById(gameId);
    const gameInfo = gameModel.gameInfo as TheGame;

    if (gameModel.status !== "in-progress")
      throw new Error("플레이 중이 아닙니다");

    const player = this.findPlayerInGame(gameInfo, playerId);
    const stack = this.findStackInGame(gameInfo, stackId);

    isValidPlayer(gameInfo, playerId);

    if (!player.hand.includes(card))
      throw new Error("존재하지 않은 카드입니다");
    if (!canPlaceCard(stack, card)) throw new Error("카드를 올릴 수 없습니다");

    const { updatedPlayer, updatedStack } = dropCard(player, stack, card);

    gameModel.gameInfo = {
      ...gameInfo,
      players: gameInfo.players.map((p) =>
        p.id === playerId ? updatedPlayer : p,
      ),
      stacks: gameInfo.stacks.map((s) => (s.id === stackId ? updatedStack : s)),
      dropCardCount: gameInfo.dropCardCount + 1,
    };

    return this.gameRepository.save(gameModel);
  }

  async endTurn(gameId: string, playerId: string): Promise<GameEngineModel> {
    const gameModel = await this.findGameById(gameId);
    const gameInfo = gameModel.gameInfo as TheGame;

    isValidPlayer(gameInfo, playerId);
    isValidDropCard(gameInfo.dropCardCount, gameInfo.deck);

    let updatedGameInfo = { ...gameInfo };

    const drawCardCount = Math.min(
      gameInfo.dropCardCount,
      gameInfo.deck.length,
    );

    times(drawCardCount, () => {
      const player = this.findPlayerInGame(updatedGameInfo, playerId);
      const { updatedDeck, updatedPlayer } = drawCard(
        updatedGameInfo.deck,
        player,
      );
      updatedGameInfo.deck = updatedDeck;
      updatedGameInfo.players = updatedGameInfo.players.map((p) =>
        p.id === playerId ? updatedPlayer : p,
      );
    });

    updatedGameInfo.dropCardCount = 0;

    if (isWinGame(updatedGameInfo) || isLoseGame(updatedGameInfo)) {
      gameModel.status = "finished" as GameStatus;
    } else {
      const nextTurn = getNextTurnIndex(updatedGameInfo);
      if (nextTurn !== -1) updatedGameInfo.currentTurn = nextTurn;
    }

    gameModel.gameInfo = updatedGameInfo;
    return this.gameRepository.save(gameModel);
  }

  async getGameView(gameId: string, playerId: string): Promise<TheGame> {
    const gameModel = await this.findGameById(gameId);
    const gameInfo = gameModel.gameInfo as TheGame;

    const view: TheGame = {
      ...gameInfo,
      players: gameInfo.players.map((player) =>
        player.id === playerId
          ? player
          : { ...player, hand: [], handCnt: player.hand.length },
      ),
    };

    return view;
  }

  private async findGameById(gameId: string): Promise<GameEngineModel> {
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) throw new Error("게임을 찾을 수 없습니다.");
    return game;
  }

  private findPlayerInGame(gameInfo: TheGame, playerId: string) {
    const player = gameInfo.players.find((p) => p.id === playerId);
    if (!player) throw new Error("플레이어를 찾을 수 없습니다.");
    return player;
  }

  private findStackInGame(gameInfo: TheGame, stackId: string) {
    const stack = gameInfo.stacks.find((s) => s.id === stackId);
    if (!stack) throw new Error("스택을 찾을 수 없습니다.");
    return stack;
  }
}
