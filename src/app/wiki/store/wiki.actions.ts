import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiOption, WikiSummary } from '../models/wiki.types';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadSearchSummary: props<{ title: string }>(),
    loadRelatedSummary: props<{ title: string }>(),
    loadRandomSummary: emptyProps(),
    loadSummarySuccess: props<WikiSummary & Readonly<{ option: WikiOption }>>(),
    loadSummaryError: emptyProps(),
    saveWikiSession: emptyProps()
  }
});
