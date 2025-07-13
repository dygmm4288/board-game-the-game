import { getArrayNumber } from "../../../utils/array";
import { STACK_DIRECTION } from "../constants";
import {
  canPlaceCard,
  dealCards,
  dropCard,
  getHandSize,
  getUpdatedStack,
  hasPlayableCard,
  shuffleDeck,
} from "../game.logic";
import { Player, Stack } from "../game.model";

describe("shuffle deck", () => {
  it("주어진 개수만큼 덱을 구성해야한다.", () => {
    const lengths = [1, 2, 5, 100];

    lengths.forEach((length) => {
      expect(shuffleDeck(getArrayNumber(length)).length).toBe(length);
    });
  });

  it("셔플한 이후에 덱이 중복/누락되면 안된다", () => {
    const originalDeck = getArrayNumber(10);
    const shuffledDeck = shuffleDeck(originalDeck);

    expect(shuffledDeck.sort()).toEqual(originalDeck);
  });

  it("셔플한 이후는 셔플하기 이전에 값과 인덱스와 비교했을때 최소 하나 이상 달라야 한다", () => {
    const originalDeck = getArrayNumber(10);
    const shuffledDeck = shuffleDeck(originalDeck);

    const isShuffled = shuffledDeck.some(
      (value, idx) => value !== originalDeck[idx],
    );

    expect(isShuffled).toBe(true);
  });
});

describe("canPlaceCard", () => {
  describe("오름차순", () => {
    const ascStack: Stack = {
      id: "asc-1",
      direction: STACK_DIRECTION.ASC,
      cards: [10, 21, 30],
    };

    it("top card보다 높은 숫자가 있으면 놓을 수 있어야 한다.", () => {
      expect(canPlaceCard(ascStack, 40)).toBe(true);
    });
    it("top card보다 낮은 숫자가 있으면 놓을 수 없어야 한다.", () => {
      expect(canPlaceCard(ascStack, 11)).toBe(false);
    });
    it("top card보다 -10낮은 숫자는 놓을 수 있어야 한다.", () => {
      expect(canPlaceCard(ascStack, 20)).toBe(true);
    });
  });

  describe("내림차순", () => {
    const descStack: Stack = {
      id: "desc-1",
      direction: STACK_DIRECTION.DESC,
      cards: [30, 21, 10],
    };

    it("top card보다 낮은 숫자가 있으면 놓을 수 있어야 한다.", () => {
      expect(canPlaceCard(descStack, 5)).toBe(true);
    });
    it("top card보다 높은 숫자가 있으면 놓을 수 없어야 한다.", () => {
      expect(canPlaceCard(descStack, 11)).toBe(false);
    });
    it("top card보다 +10 높은 숫자는 놓을 수 있어야 한다.", () => {
      expect(canPlaceCard(descStack, 20)).toBe(true);
    });
  });
});

describe("dealCards", () => {
  const players: Player[] = [
    { id: "p1", name: "P1", hand: [] },
    { id: "p2", name: "P2", hand: [] },
  ];
  const handSize = getHandSize(players);
  const deck = getArrayNumber(100);
  const [playersWithHands, remainingDeck] = dealCards(
    deck,
    players,
    getHandSize(players),
  );

  const allCards = [
    ...remainingDeck,
    ...playersWithHands.reduce<number[]>(
      (a, player) => [...a, ...player.hand],
      [],
    ),
  ];

  it("player hand에 각각 size만큼을 가지고 있어야 한다.", () => {
    playersWithHands.forEach((player) =>
      expect(player.hand.length).toBe(handSize),
    );
  });
  it("player hand에는 중복없이 카드를 가지고 있어야 한다.", () => {
    const hands = playersWithHands.reduce<number[]>(
      (a, player) => [...a, ...player.hand],
      [],
    );

    const totalCardCnt = handSize * players.length;

    expect(hands.length).toBe(totalCardCnt);
  });
  it("player hand와 남은 카드들을 다 합쳤을 때 중복/누락이 없어야 한다.", () => {
    expect(new Set(allCards).size).toBe(deck.length);
    expect(new Set(allCards)).toEqual(new Set(deck));
  });
});

describe("getUpdatedStack", () => {
  const stack: Stack = {
    id: "asc-1",
    direction: STACK_DIRECTION.ASC,
    cards: [1],
  };
  const card = 10;
  const newStack = getUpdatedStack(stack, card);
  it("원본 스택은 변경되면 안된다", () => {
    expect(newStack).not.toBe(stack);
  });
  it("정상적으로 stack에 card가 추가된 새 스택을 반환해야 한다.", () => {
    expect(newStack.cards).toContain(card);
  });
  it("stack에 넣을 수 없는 카드일 경우 오류를 반환해야 한다.", () => {
    const stack: Stack = {
      id: "asc-1",
      direction: STACK_DIRECTION.ASC,
      cards: [10],
    };
    const card = 5;
    expect(() => getUpdatedStack(stack, card)).toThrow(
      /카드를 올릴 수 없습니다/,
    );
  });
});

describe("hasPlayableCard", () => {
  const player: Player = { id: "p1", name: "p1", hand: [10] };
  it("플레이할 수 있는 카드가 존재하면 true를 반환한다.", () => {
    const stacks: Stack[] = [
      { id: "asc-1", direction: STACK_DIRECTION.ASC, cards: [5] },
    ];
    expect(hasPlayableCard(player, stacks)).toBe(true);
  });
  it("플레이할 수 있는 카드가 없으면 false를 반환한다.", () => {
    const stacks: Stack[] = [
      { id: "asc-1", direction: STACK_DIRECTION.ASC, cards: [15] },
    ];
    expect(hasPlayableCard(player, stacks)).toBe(false);
  });
});

describe("dropCard", () => {
  const player: Player = { id: "p1", name: "p1", hand: [10, 3] };
  const stack: Stack = {
    id: "asc-1",
    direction: STACK_DIRECTION.ASC,
    cards: [5],
  };

  it("카드가 올바르게 스택에 추가돼야한다 ", () => {
    const { updatedStack } = dropCard(player, stack, 10);
    expect(updatedStack.cards).toContain(10);
  });

  it("카드가 플레이어 손에서 제거돼야한다", () => {
    const { updatedPlayer } = dropCard(player, stack, 10);
    expect(updatedPlayer.hand).not.toContain(10);
  });
  it("원본 객체는 불변이어야 한다", () => {
    const { updatedPlayer, updatedStack } = dropCard(player, stack, 10);

    expect(updatedPlayer).not.toBe(player);
    expect(updatedStack).not.toBe(stack);
  });

  it("플레이어가 가지지 않은 카드일 경우 오류를 반환해야 한다.", () => {
    expect(() => dropCard(player, stack, 5)).toThrow(/유효하지 않은 카드/);
  });

  it("스택에 올릴 수 없는 카드일 경우 오류를 반환해야 한다.", () => {
    expect(() => dropCard(player, stack, 3)).toThrow(/카드를 올릴 수 없습니다/);
  });
});
