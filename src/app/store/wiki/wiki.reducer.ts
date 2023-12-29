import { createFeature, createReducer, on } from '@ngrx/store';
import { wikiActions } from './wiki.actions';
import { initialState } from './wiki.state';

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadExtractSuccess, (state, { extract }) => ({ extract, isLoading: false })),
    on(wikiActions.loadExtractError, (state) => ({ extract: 'An error has occurred :(', isLoading: false }))
  )
});
