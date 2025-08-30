import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { isEmpty } from '../../application/functions/common.functions';
import { defaultLimit } from '../../domain/constants/words.constants';
import { WordsService } from '../../infrastructure/services/words.service';
import { wordsActions } from '../actions/words.actions';
import { selectCommonWords } from '../selectors/words.selectors';

export const loadCommonWords = createEffect(
  (actions$ = inject(Actions), wordsService = inject(WordsService), store = inject(Store)) =>
    actions$.pipe(
      ofType(wordsActions.loadCommonWords),
      concatLatestFrom(() => store.select(selectCommonWords)),
      filter(([_, commonWords]) => isEmpty(commonWords)),
      tap(() => store.dispatch(wordsActions.setIsLoading({ isLoading: true }))),
      exhaustMap(() =>
        wordsService.findCommonWords().pipe(
          map((commonWords) => wordsActions.loadCommonWordsSuccess({ commonWords, limit: defaultLimit })),
          catchError(() => of(wordsActions.loadCommonWordsError()))
        )
      )
    ),
  { functional: true, dispatch: true }
);
