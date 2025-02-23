import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const wordsActions = createActionGroup({
  source: 'words',
  events: {
    loadCommonWords: emptyProps(),
    loadCommonWordsSuccess: props<{ commonWords: ReadonlyArray<string>, limit: number }>(),
    loadCommonWordsError: emptyProps(),
    generateRandomWords: props<{ limit: number }>(),
    setIsLoading: props<{ isLoading: boolean }>()
  }
});
