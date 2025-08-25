import { createFeature, createReducer, on } from '@ngrx/store';
import { wordsInitialState, WordsState } from '../states/words.state';
import { wordsActions } from '../actions/words.actions';
import { generateRandomWords } from '../../domain/functions/words.functions';

export const wordsFeature = createFeature<'words', WordsState>({
  name: 'words',
  reducer: createReducer<WordsState>(
    wordsInitialState,
    on(wordsActions.loadCommonWordsSuccess, (_, { commonWords, limit }) => ({
      commonWords,
      randomWords: generateRandomWords(commonWords, limit),
      isLoading: false
    })),
    on(wordsActions.loadCommonWordsError, (state) => ({ ...state, isLoading: false })),
    on(wordsActions.generateRandomWords, (state, { limit }) => ({
      ...state,
      randomWords: generateRandomWords(state.commonWords, limit)
    })),
    on(wordsActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading }))
  )
});
