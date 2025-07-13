import { getArrayNumber } from "../../../utils/array";
import { STACK_DIRECTION } from "../constants";
import { canPlaceCard, shuffleDeck } from "../game.logic";
import { Stack } from "../game.model";

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
