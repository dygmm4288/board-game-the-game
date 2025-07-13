export const STACK_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const GAME_STATUS = {
  WAITING: "waiting",
  IN_PROGRESS: "in-progress",
  FINISHED: "finished",
} as const;

export const DEFAULT_HAND_SIZE = 6;
export const HAND_SIZE_BY_PLAYER_COUNT: Record<number, number> = {
  1: 8,
  2: 7,
  3: DEFAULT_HAND_SIZE,
  4: DEFAULT_HAND_SIZE,
  5: DEFAULT_HAND_SIZE,
};
