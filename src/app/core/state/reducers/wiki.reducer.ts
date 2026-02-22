import { createFeature, on } from '@ngrx/store';

import { createRehydrateReducer } from '../../functions/storage.functions';
import { wikiActions } from '../actions/wiki.actions';
import { WikiState, initialState } from '../states/wiki.state';
import { sessionOption } from '../../../domain/constants/session-option.const';

export const wikiFeature = createFeature<'wiki', WikiState>({
  name: 'wiki',
  reducer: createRehydrateReducer<WikiState>(
    'wikiState',
    initialState,
    on(wikiActions.setIsLoading, (state, { isLoading }) => ({ ...state, isLoading })),
    on(wikiActions.loadSummarySuccess, (state, wikiInfo) => ({
      ...state,
      ...wikiInfo,
      extract: wikiInfo.extract.trim(),
      isLoading: false
    })),
    on(wikiActions.loadSummaryError, (state) => loadExtractError(state)),
    on(wikiActions.updateWikiLang, (state, { wikiLang }) => ({ ...state, wikiLang }))
  )
});

function loadExtractError(state: WikiState): WikiState {
  return {
    ...state,
    extract: 'Vašíček の  éé hey の\nan    error has occurredの'.trim(),
    title: 'Error wtf?!',
    option: sessionOption.search,
    isLoading: false
  };
}
