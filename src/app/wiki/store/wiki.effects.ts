import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { WikiState, WikiSummary } from '../../common/types';
import { WikiService } from '../services/wiki.service';
import { wikiActions } from './wiki.actions';

export const wikiLoadExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadSearchSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchSummary(title).pipe(
          map((wikiSummary: WikiSummary) => wikiActions.loadSummarySuccess({ ...wikiSummary, mode: 'search' })),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true }
);

export const wikiLoadRelatedExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRelatedSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchRelatedSummary(title).pipe(
          map((wikiSummary: WikiSummary) => wikiActions.loadSummarySuccess({ ...wikiSummary, mode: 'related' })),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true }
);

export const wikiLoadRandomExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRandomSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(() =>
        wikiService.fetchRandomSummary().pipe(
          map((wikiSummary: WikiSummary) => wikiActions.loadSummarySuccess({ ...wikiSummary, mode: 'random' })),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true }
);
