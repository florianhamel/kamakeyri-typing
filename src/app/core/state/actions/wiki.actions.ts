import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiLang, WikiSummary } from '../../../domain/types/wiki.type';
import { SessionOption } from '../../../domain/constants/session-option.const';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadSearchSummary: props<{ label: string }>(),
    loadRelatedSummary: props<{ label: string }>(),
    loadRandomSummary: emptyProps(),
    loadSummary: props<{ mode: SessionOption; label: string | null }>(),
    loadSummarySuccess: props<WikiSummary & Readonly<{ option: SessionOption }>>(),
    loadSummaryError: emptyProps(),
    saveWikiSession: emptyProps(),
    updateWikiLang: props<{ wikiLang: WikiLang }>()
  }
});
