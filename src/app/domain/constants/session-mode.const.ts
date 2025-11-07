export const sessionMode = {
  wiki: 'WIKI',
  words: 'WORDS',
  custom: 'CUSTOM'
} as const;

export type SessionMode = (typeof sessionMode)[keyof typeof sessionMode];
