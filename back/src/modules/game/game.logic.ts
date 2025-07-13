import { shuffle } from "lodash-es";
export const shuffleDeck = (deck: number[]): number[] => {
  return shuffle(deck);
};
