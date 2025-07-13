import { cloneDeep, last, shuffle } from "lodash-es";
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

export const generateDeck = () => {
  return Array.from({ length: 98 }, (_, i) => i + 2);
};

export const generateInitialStacks = (): Stack[] => {
  return [
    { id: "asc-1", direction: STACK_DIRECTION.ASC, cards: [1] },
    { id: "asc-2", direction: STACK_DIRECTION.ASC, cards: [1] },
    { id: "desc-1", direction: STACK_DIRECTION.DESC, cards: [100] },
    { id: "desc-2", direction: STACK_DIRECTION.DESC, cards: [100] },
  ];
};

export const getUpdatedStack = (stack: Stack, card: number): Stack => {
  const newStack = cloneDeep(stack);

  if (!canPlaceCard(newStack, card)) throw new Error("카드를 올릴 수 없습니다");

  newStack.cards.push(card);

  return newStack;
};
