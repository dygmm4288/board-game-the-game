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
      dropCardCount: 0,
    };

    const service = new GameService(game);

    service.startGame();

    const handSize = getHandSize(game.players);
    const totalCards: number[] = [
      ...game.players.reduce<number[]>((a, c) => [...a, ...c.hand], []),
      ...game.deck,
    ];

    expect(game.dropCardCount).toBe(0);
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

describe("playCard", () => {
  let service: GameService;
  let game: Game;
  beforeEach(() => {
    const players: Player[] = [
      { id: "p1", name: "p1", hand: [] },
      { id: "p2", name: "p2", hand: [] },
    ];

    game = {
      id: "g1",
      createdAt: new Date(),
      currentTurn: 0,
      deck: [],
      players,
      stacks: [],
      status: "waiting",
      dropCardCount: 0,
    };
    service = new GameService(game);
    service.startGame();
  });

  it("플레이 중이 아니라면 오류를 반환해야 한다.", () => {
    game.status = "waiting";
    expect(() => service.playCard("asc-1", "p1", 0)).toThrow(
      /플레이 중이 아닙니다/,
    );

    game.status = "finished";
    expect(() => service.playCard("asc-1", "p1", 0)).toThrow(
      /플레이 중이 아닙니다/,
    );
  });

  it("플레이어가 존재하지 않으면 오류를 반환해야 한다.", () => {
    expect(() => service.playCard("asc-1", "p3", -1)).toThrow(
      /플레이어가 없습니다/,
    );
  });

  it("스택이 존재하지 않으면 오류를 반환해야 한다.", () => {
    expect(() => service.playCard("asc-3", "p1", -1)).toThrow(
      /스택이 없습니다/,
    );
  });

  it("플레이어가 카드를 가지고 있지 않으면 오류를 반환해야 한다.", () => {
    expect(() => service.playCard("asc-1", "p1", -1)).toThrow(
      /존재하지 않은 카드입니다/,
    );
  });

  it("카드를 올릴 수 없으면 오류를 반환해야 한다.", () => {
    const player = game.players[0];
    game.stacks[0].cards = [99];
    expect(() => service.playCard("asc-1", "p1", player.hand[0])).toThrow(
      /카드를 올릴 수 없습니다/,
    );
  });

  it("카드가 스택에 올라가야 하고 플레이어의 손에는 해당 카드가 없어야 한다.", () => {
    const player = game.players[0];
    const card = player.hand[0];
    const handSize = player.hand.length;
    service.playCard("asc-1", "p1", card);

    expect(game.players[0].hand).not.toContain(card);
    expect(game.stacks[0].cards).toContain(card);

    expect(game.players[0].hand.length).toBe(handSize - 1);
    expect(game.stacks[0].cards.length).toBeGreaterThan(1);
  });

  it("카드를 드롭하면 drop card cnt가 1씩 증가해야 한다", () => {
    game.players[0].hand = [2, 3, 4, 5, 6, 7];
    service.playCard("asc-1", "p1", game.players[0].hand[0]);
    expect(game.dropCardCount).toBe(1);

    service.playCard("asc-1", "p1", game.players[0].hand[0]);
    expect(game.dropCardCount).toBe(2);
  });
});
