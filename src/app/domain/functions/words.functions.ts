export function generateRandomWords(words: ReadonlyArray<string>, limit: number): ReadonlyArray<string> {
  return Array.from({ length: limit }).map((_) => words[Math.floor(Math.random() * words.length)]);
}
