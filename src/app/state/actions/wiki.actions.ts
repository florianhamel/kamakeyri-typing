import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiSummary } from '../../domain/types/wiki.types';
import { TypingOption } from '../../domain/types/session.types';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadSearchSummary: props<{ title: string }>(),
    loadRelatedSummary: props<{ title: string }>(),
    loadRandomSummary: emptyProps(),
    loadSummarySuccess: props<WikiSummary & Readonly<{ option: TypingOption }>>(),
    loadSummaryError: emptyProps(),
    saveWikiSession: emptyProps()
  }
});
