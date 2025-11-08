import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { sessionOption } from '../../domain/constants/session-option.const';
import { WikiSummary } from '../../domain/types/wiki.type';
import { WikiRepository } from '../../domain/repositories/wiki.repository';
import { wikiActions } from '../actions/wiki.actions';
import { WikiState } from '../states/wiki.state';

export const wikiLoadExtract = createEffect(
  (actions$ = inject(Actions), wikiRepository = inject(WikiRepository), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadSearchSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ label }) =>
        wikiRepository.fetchSummary(label).pipe(
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: sessionOption.search })
          ),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

export const wikiLoadRelatedExtract = createEffect(
  (actions$ = inject(Actions), wikiRepository = inject(WikiRepository), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRelatedSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ label }) =>
        wikiRepository.fetchRelatedSummary(label).pipe(
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: sessionOption.related })
          ),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

export const wikiLoadRandomExtract = createEffect(
  (actions$ = inject(Actions), wikiRepository = inject(WikiRepository), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadRandomSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(() =>
        wikiRepository.fetchRandomSummary().pipe(
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: sessionOption.random })
          ),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);
