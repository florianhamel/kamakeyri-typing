import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { WikiService } from '../../application/services/wiki.service';
import { WikiSummary } from '../../domain/types/wiki.types';
import { wikiActions } from '../actions/wiki.actions';
import { WikiState } from '../states/wiki.state';
import { SessionOption } from '../../domain/enums/session-option.enum';

export const wikiLoadExtract = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), wikiStore = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadSearchSummary),
      tap(() => wikiStore.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ label }) =>
        wikiService.fetchSummary(label).pipe(
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: SessionOption.Search })
          ),
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
      exhaustMap(({ label }) =>
        wikiService.fetchRelatedSummary(label).pipe(
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: SessionOption.Related })
          ),
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
          map((wikiSummary: WikiSummary) =>
            wikiActions.loadSummarySuccess({ ...wikiSummary, option: SessionOption.Random })
          ),
          catchError(() => of(wikiActions.loadSummaryError()))
        )
      )
    );
  },
  { functional: true }
);
