import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { WikiState } from '../../models/store.types';
import { WikiSummary } from '../../models/types';
import { WikiService } from '../../services/wiki/wiki.service';
import { wikiActions } from './wiki.actions';

export const loadWiki = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadExtract),
      tap(() => store.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchWikiSummary(title).pipe(
          map((value: WikiSummary) => wikiActions.loadExtractSuccess(value)),
          catchError((_: { message: string }) => of(wikiActions.loadExtractError())),
          finalize(() => store.dispatch(wikiActions.setIsLoading({ isLoading: false })))
        )
      )
    );
  },
  { functional: true }
);
