import { last, shuffle } from "lodash-es";
import {
  DEFAULT_HAND_SIZE,
  HAND_SIZE_BY_PLAYER_COUNT,
  STACK_DIRECTION,
} from "./constants";
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
  return HAND_SIZE_BY_PLAYER_COUNT[playerSize] ?? DEFAULT_HAND_SIZE;
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
