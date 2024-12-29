import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { WordsService } from '../../application/services/words.service';
import { wordsActions } from '../actions/words.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const loadCommonWords = createEffect(
  (actions$ = inject(Actions), wordsService = inject(WordsService)) =>
    actions$.pipe(
      ofType(wordsActions.loadCommonWords),
      exhaustMap(() =>
        wordsService.findCommonWords().pipe(
          map((commonWords) => wordsActions.loadCommonWordsSuccess({ commonWords })),
          catchError(() => of(wordsActions.loadCommonWordsError()))
        )
      )
    ),
  { functional: true, dispatch: true }
);
