import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState, WordsState } from '../states/words.state';
import { wordsActions } from '../actions/words.actions';

export const wordsFeature = createFeature<'words', WordsState>({
  name: 'words',
  reducer: createReducer<WordsState>(
    initialState,
    on(wordsActions.loadCommonWordsSuccess, (state, { commonWords }) => ({ ...state, commonWords }))
  )
});
