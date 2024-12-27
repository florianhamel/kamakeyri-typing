import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiSummary } from '../../domain/types/wiki.types';
import { SessionOption } from '../../domain/enums/session-option.enum';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadSearchSummary: props<{ label: string }>(),
    loadRelatedSummary: props<{ label: string }>(),
    loadRandomSummary: emptyProps(),
    loadSummary: props<{ mode: SessionOption, label: string | null }>(),
    loadSummarySuccess: props<WikiSummary & Readonly<{ option: SessionOption }>>(),
    loadSummaryError: emptyProps(),
    saveWikiSession: emptyProps()
  }
});
