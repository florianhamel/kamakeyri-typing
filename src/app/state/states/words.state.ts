export type WordsState = {
  commonWords: ReadonlyArray<string>;
  randomWords: ReadonlyArray<string>;
  isLoading: boolean;
};

export const initialState: WordsState = {
  commonWords: [],
  randomWords: [],
  isLoading: false
};
