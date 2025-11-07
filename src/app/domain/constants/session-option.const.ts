export const sessionOption = {
  search: 'SEARCH',
  related: 'RELATED',
  random: 'RANDOM',
  timeLimit: 'TIME_LIMIT',
  wordLimit: 'WORD_LIMIT',
  none: 'NONE'
} as const;

export type SessionOption = (typeof sessionOption)[keyof typeof sessionOption];
