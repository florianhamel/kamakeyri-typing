import { createFeature, createReducer, on } from '@ngrx/store';
import { wikiActions } from '../actions/wiki.actions';
import { initialState, WikiState } from '../states/wiki.state';
import { SessionOption } from '../../domain/enums/session-option.enum';
import { createRehydrateReducer } from '../../application/helpers/storage.helper';

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
    option: SessionOption.Search,
    isLoading: false
  };
}
