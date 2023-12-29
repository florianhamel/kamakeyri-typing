import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const wikiActions = createActionGroup({
  source: 'wiki',
  events: {
    setIsLoading: props<{ isLoading: boolean }>(),
    loadExtract: props<{ title: string }>(),
    loadExtractSuccess: props<{ extract: string }>(),
    loadExtractError: props<{ message: string }>()
  }
});
