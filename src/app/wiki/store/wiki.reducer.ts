import { createFeature, createReducer, on } from '@ngrx/store';
import { WikiState } from '../../common/types';
import { wikiActions } from './wiki.actions';
import { initialState } from './wiki.state';

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadSummarySuccess, (_, wikiInfo) => ({ ...wikiInfo, isLoading: false })),
    on(wikiActions.loadSummaryError, (state) => loadedExtractError(state))
  )
});

function loadedExtractError(state: WikiState): WikiState {
  return {
    ...state,
    extract: 'のののOh の\nan error has occurredののの',
    title: null,
    mode: null,
    isLoading: false
  };
}
