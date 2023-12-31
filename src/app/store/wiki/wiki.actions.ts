import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiSummary } from '../../models/types';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadExtract: props<{ title: string }>(),
    loadExtractSuccess: props<WikiSummary>(),
    loadExtractError: emptyProps()
  }
});
