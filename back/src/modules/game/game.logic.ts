import { last, shuffle } from "lodash-es";
import { STACK_DIRECTION } from "./constants";
import { Player, Stack } from "./game.model";

export const shuffleDeck = (deck: number[]): number[] => {
  return shuffle(deck);
};

export const canPlaceCard = (stack: Stack, card: number): boolean => {
  const topCard = last(stack.cards)!;
  if (stack.direction === STACK_DIRECTION.ASC)
    return topCard < card || topCard - 10 === card;

  return topCard > card || topCard + 10 === card;
};

export const getHandSize = (players: Player[]): number => {
  const playerSize = players.length;

  if (playerSize === 0 || playerSize > 5) return 0;

  if (playerSize === 1) return 8;
  if (playerSize === 2) return 7;

  return 6;
};

export const dealCards = (
  deck: number[],
  players: Player[],
  size: number,
): [Player[], number[]] => {
  const _deck = [...deck];
  const newPlayers = players.map((player) => {
    const hand = _deck.splice(0, size);
    return {
      ...player,
      hand,
    };
  });

  return [newPlayers, _deck];
};
