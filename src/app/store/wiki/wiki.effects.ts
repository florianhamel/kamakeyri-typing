import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { WikiState, WikiSummary } from '../../models/types';
import { WikiService } from '../../services/wiki/wiki.service';
import { wikiActions } from './wiki.actions';

export const wikiLoadExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadExtract),
      tap(() => store.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchSummary(title).pipe(
          map((value: WikiSummary) => wikiActions.loadExtractSuccess(value)),
          catchError(() => of(wikiActions.loadExtractError())),
          finalize(() => store.dispatch(wikiActions.setIsLoading({ isLoading: false })))
        )
      )
    );
  },
  { functional: true }
);

export const wikiLoadRelatedExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRelatedExtract),
      tap(() => store.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchRelatedSummary(title).pipe(
          map((value: WikiSummary) => wikiActions.loadExtractSuccess(value)),
          catchError(() => of(wikiActions.loadExtractError())),
          finalize(() => store.dispatch(wikiActions.setIsLoading({ isLoading: false })))
        )
      )
    );
  },
  { functional: true }
);

export const wikiLoadRandomExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRandomExtract),
      tap(() => store.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(() =>
        wikiService.fetchRandomSummary().pipe(
          map((value: WikiSummary) => wikiActions.loadExtractSuccess(value)),
          catchError(() => of(wikiActions.loadExtractError())),
          finalize(() => store.dispatch(wikiActions.setIsLoading({ isLoading: false })))
        )
      )
    );
  },
  { functional: true }
);
