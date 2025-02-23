export type WordsState = {
  commonWords: ReadonlyArray<string>;
  isLoading: boolean;
};

export const initialState: WordsState = {
  commonWords: [],
  isLoading: false
};
