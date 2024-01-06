import { createFeature, createReducer, on } from '@ngrx/store';
import { WikiState } from '../../common/types';
import { wikiActions } from './wiki.actions';
import { initialState } from './wiki.state';

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadExtractSuccess, (state, wikiSummary) => ({ ...state, ...wikiSummary, isLoading: false })),
    on(wikiActions.loadExtractError, (state) => loadedExtractError(state))
  )
});

function loadedExtractError(state: WikiState): WikiState {
  return {
    ...state,
    title: null,
    extract: 'のののOh の\nan error has occurredののの',
    isLoading: false
  };
}
