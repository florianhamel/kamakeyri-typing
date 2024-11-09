import { createFeature, createReducer, on } from '@ngrx/store';
import { wikiActions } from './wiki.actions';
import { initialState } from './wiki.state';
import { WikiState } from '../models/wiki.types';

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadSummarySuccess, (_, wikiInfo) => ({
      ...wikiInfo,
      extract: wikiInfo.extract.trim(),
      isLoading: false
    })),
    on(wikiActions.loadSummaryError, (state) => loadedExtractError(state))
  )
});

function loadedExtractError(state: WikiState): WikiState {
  return {
    ...state,
    extract: 'Oh  éé hey の\nan    error has occurredの'.trim(),
    title: null,
    option: null,
    isLoading: false
  };
}
