export type WordsState = {
  commonWords: ReadonlyArray<string>;
  randomWords: ReadonlyArray<string>;
  isLoading: boolean;
};

export const wordsInitialState: WordsState = {
  commonWords: [],
  randomWords: [],
  isLoading: false
};
