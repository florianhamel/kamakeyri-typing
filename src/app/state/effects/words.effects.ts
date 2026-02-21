import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { isEmpty } from '../../application/functions/common.functions';
import { defaultLimit } from '../../domain/constants/words.const';
import { WORDS_REPOSITORY } from '../../domain/repositories/words.repository';
import { wordsActions } from '../actions/words.actions';
import { selectCommonWords } from '../selectors/words.selectors';

export const loadCommonWords = createEffect(
  (actions$ = inject(Actions), wordsRepository = inject(WORDS_REPOSITORY), store = inject(Store)) =>
    actions$.pipe(
      ofType(wordsActions.loadCommonWords),
      concatLatestFrom(() => store.select(selectCommonWords)),
      filter(([_, commonWords]) => isEmpty(commonWords)),
      tap(() => store.dispatch(wordsActions.setIsLoading({ isLoading: true }))),
      exhaustMap(() =>
        wordsRepository.findCommonWords().pipe(
          map((commonWords) => wordsActions.loadCommonWordsSuccess({ commonWords, limit: defaultLimit })),
          catchError(() => of(wordsActions.loadCommonWordsError()))
        )
      )
    ),
  { functional: true, dispatch: true }
);
