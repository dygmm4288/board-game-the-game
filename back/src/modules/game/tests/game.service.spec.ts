import { STACK_DIRECTION } from "../constants";
import { generateDeck, getHandSize } from "../game.logic";
import { Game, Player } from "../game.model";
import { GameService } from "../game.service";

describe("startGame", () => {
  it("게임이 정상적으로 초기화 돼야한다", () => {
    const players: Player[] = [
      { id: "p1", name: "p1", hand: [] },
      { id: "p2", name: "p2", hand: [] },
    ];

    const game: Game = {
      id: "g1",
      createdAt: new Date(),
      currentTurn: 0,
      deck: [],
      players,
      stacks: [],
      status: "waiting",
    };

    const service = new GameService(game);

    service.startGame();

    const handSize = getHandSize(game.players);
    const totalCards: number[] = [
      ...game.players.reduce<number[]>((a, c) => [...a, ...c.hand], []),
      ...game.deck,
    ];

    expect(game.currentTurn).toBe(0);
    expect(game.players.length).toBe(2);
    game.players.forEach((p) => expect(p.hand.length).toBe(handSize));

    expect(game.deck.length).toBe(98 - handSize * 2);
    expect(game.stacks.length).toBe(4);
    expect(
      game.stacks.filter((v) => v.direction === STACK_DIRECTION.ASC).length,
    ).toBe(2);
    expect(
      game.stacks.filter((v) => v.direction === STACK_DIRECTION.DESC).length,
    ).toBe(2);
    expect(game.status).toBe("in-progress");
    expect(totalCards.sort((a, b) => a - b)).toEqual(generateDeck());
  });
});
