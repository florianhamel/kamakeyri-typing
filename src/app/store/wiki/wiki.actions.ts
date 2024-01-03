import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WikiSummary } from '../../models/types';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadExtract: props<{ title: string }>(),
    loadRelatedExtract: props<{ title: string }>(),
    loadRandomExtract: emptyProps(),
    loadExtractSuccess: props<WikiSummary>(),
    loadExtractError: emptyProps()
  }
});
