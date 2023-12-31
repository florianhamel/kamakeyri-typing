import { createFeature, createReducer, on } from '@ngrx/store';
import { wikiActions } from './wiki.actions';
import { initialState } from './wiki.state';

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadExtractSuccess, (state, wikiSummary) => ({ ...state, ...wikiSummary })),
    on(wikiActions.loadExtractError, (state) => ({ ...state, title: null, extract: 'Oh の! an error ののの has occurredののの' }))
  )
});
