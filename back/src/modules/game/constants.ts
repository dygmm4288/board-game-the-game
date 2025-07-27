export const STACK_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const DEFAULT_HAND_SIZE = 6;
export const HAND_SIZE_BY_PLAYER_COUNT: Record<number, number> = {
  1: 8,
  2: 7,
  3: DEFAULT_HAND_SIZE,
  4: DEFAULT_HAND_SIZE,
  5: DEFAULT_HAND_SIZE,
};

export const GAME_FIND_ERROR_MAP = {
  stacks: "스택이 없습니다",
  players: "플레이어가 없습니다",
} as const;
