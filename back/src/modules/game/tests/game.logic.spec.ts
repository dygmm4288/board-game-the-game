import { getArrayNumber } from "../../../utils/array";
import { shuffleDeck } from "../game.logic";

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
