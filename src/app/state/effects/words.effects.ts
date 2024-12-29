import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { WordsService } from '../../application/services/words.service';
import { wordsActions } from '../actions/words.actions';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectCommonWords } from '../selectors/words.selectors';
import { isEmpty } from '../../domain/functions/common.functions';

export const loadCommonWords = createEffect(
  (actions$ = inject(Actions), wordsService = inject(WordsService), store = inject(Store)) =>
    actions$.pipe(
      ofType(wordsActions.loadCommonWords),
      concatLatestFrom(() => store.select(selectCommonWords)),
      filter(([_, commonWords]) => isEmpty(commonWords)),
      exhaustMap(() =>
        wordsService.findCommonWords().pipe(
          map((commonWords) => wordsActions.loadCommonWordsSuccess({ commonWords })),
          catchError(() => of(wordsActions.loadCommonWordsError()))
        )
      )
    ),
  { functional: true, dispatch: true }
);
