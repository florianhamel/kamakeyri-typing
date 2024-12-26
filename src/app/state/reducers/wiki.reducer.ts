import { createFeature, createReducer, on } from '@ngrx/store';
import { WikiState } from '../../domain/types/wiki.types';
import { wikiActions } from '../actions/wiki.actions';

export const initialState: WikiState = {
  extract: null,
  title: null,
  option: null,
  isLoading: false
};

export const wikiFeature = createFeature<'wiki', WikiState>({
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
    extract: 'Oh の  éé hey の\nan    error has occurredの'.trim(),
    title: null,
    option: null,
    isLoading: false
  };
}
