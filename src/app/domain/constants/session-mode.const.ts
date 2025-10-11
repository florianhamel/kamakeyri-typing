export const sessionMode = {
  wiki: 'WIKI',
  words: 'WORDS'
} as const;

export type SessionMode = (typeof sessionMode)[keyof typeof sessionMode];
