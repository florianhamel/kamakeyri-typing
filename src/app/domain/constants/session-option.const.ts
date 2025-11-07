export const sessionOption = {
  search: 'SEARCH',
  related: 'RELATED',
  random: 'RANDOM',
  timeLimit: 'TIME_LIMIT',
  wordLimit: 'WORD_LIMIT'
} as const;

export type SessionOption = (typeof sessionOption)[keyof typeof sessionOption];
