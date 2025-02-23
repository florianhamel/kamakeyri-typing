import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const wordsActions = createActionGroup({
  source: 'words',
  events: {
    loadCommonWords: emptyProps(),
    loadCommonWordsSuccess: props<{ commonWords: ReadonlyArray<string> }>(),
    loadCommonWordsError: emptyProps(),
    setIsLoading: props<{ isLoading: boolean }>()
  }
});
