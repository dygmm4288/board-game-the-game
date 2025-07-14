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

export const getUpdatedPlayer = (
  player: Player,
  card: number,
  type: "add" | "remove",
): Player => {
  const newPlayer = cloneDeep(player);
  const _isCardInHand = isCardInHand(player, card);

  if (type === "add") newPlayer.hand.push(card);
  else if (type === "remove" && _isCardInHand)
    newPlayer.hand.splice(newPlayer.hand.indexOf(card), 1);
  else if (type === "remove" && !_isCardInHand)
    throw new Error("유효하지 않은 카드입니다");

  return newPlayer;
};

export const isCardInHand = (player: Player, card: number) => {
  return player.hand.some((v) => v === card);
};

export const hasPlayableCard = (player: Player, Stacks: Stack[]) => {
  return player.hand.some((card) =>
    Stacks.some((stack) => canPlaceCard(stack, card)),
  );
};

export const dropCard = (
  player: Player,
  stack: Stack,
  card: number,
): { updatedPlayer: Player; updatedStack: Stack } => {
  return {
    updatedPlayer: getUpdatedPlayer(player, card, "remove"),
    updatedStack: getUpdatedStack(stack, card),
  };
};

export const drawCard = (
  deck: number[],
  player: Player,
): { updatedDeck: number[]; updatedPlayer: Player; card: number } => {
  const updatedDeck = [...deck];

  if (deck.length === 0)
    return {
      updatedDeck,
      updatedPlayer: player,
      card: 0,
    };

  const card: number = updatedDeck.splice(0, 1)[0];

  return {
    updatedDeck,
    updatedPlayer: getUpdatedPlayer(player, card, "add"),
    card,
  };
};
