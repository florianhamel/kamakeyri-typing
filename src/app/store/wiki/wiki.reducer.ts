import { createFeature, createReducer, on } from '@ngrx/store';
import { wikiActions } from './wiki.actions';

export type WikiState = {
  extract: string | null;
  isLoading: boolean;
};

export const initialState: WikiState = {
  extract: null,
  isLoading: false
};

export const wikiFeature = createFeature({
  name: 'wiki',
  reducer: createReducer(
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadExtractSuccess, (state, { extract }) => ({ extract, isLoading: false })),
    on(wikiActions.loadExtractError, (state) => ({ extract: 'An error has occurred :(', isLoading: false }))
  )
});

export const { selectExtract, selectIsLoading } = wikiFeature;
