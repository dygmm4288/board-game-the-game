import { cloneDeep, last, shuffle } from "lodash-es";
import {
  DEFAULT_HAND_SIZE,
  HAND_SIZE_BY_PLAYER_COUNT,
  STACK_DIRECTION,
} from "./constants";
import { Player, Stack, TheGame } from "./game.model";

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
): { updatedDeck: number[]; updatedPlayer: Player; card: number | null } => {
  const updatedDeck = [...deck];

  if (deck.length === 0)
    return {
      updatedDeck,
      updatedPlayer: player,
      card: null,
    };

  const card: number = updatedDeck.splice(0, 1)[0];

  return {
    updatedDeck,
    updatedPlayer: getUpdatedPlayer(player, card, "add"),
    card,
  };
};

export const isValidDropCard = (
  dropCardCount: number,
  deck: number[],
): void => {
  const isEmptyDeck = deck.length === 0;
  if (isEmptyDeck && dropCardCount < 1)
    throw new Error("최소 1개를 내려놓아야 합니다");
  if (!isEmptyDeck && dropCardCount < 2)
    throw new Error("최소 2개 이상 내려놓아야 합니다");
};

export const isValidPlayer = (game: TheGame, playerId: string) => {
  const { currentTurn } = game;
  const index = game.players.findIndex((player) => player.id === playerId);

  if (index !== currentTurn) throw new Error("올바르지 않은 플레이어입니다");
};

export const getNextTurnIndex = (game: TheGame): number => {
  const playerSize = game.players.length;
  const index = game.players
    .map((_, idx) => (idx + 1) % playerSize)
    .find((idx) => game.players[idx].hand.length !== 0);
  if (!index) return -1;
  return index;
};

export const isWinGame = (game: TheGame): boolean => {
  return game.players.every((player) => player.hand.length === 0);
};

export const isLoseGame = (game: TheGame): boolean => {
  return game.players.every(
    (player) =>
      !hasPlayableCard(player, game.stacks) || player.hand.length === 0,
  );
};
