import { last, shuffle } from "lodash-es";
import { Stack } from "./game.model";

export const shuffleDeck = (deck: number[]): number[] => {
  return shuffle(deck);
};

export const canPlaceCard = (stack: Stack, card: number): boolean => {
  const topCard = last(stack.cards)!;
  if (stack.direction === "asc") return topCard < card || topCard - 10 === card;

  return topCard > card || topCard + 10 === card;
};
