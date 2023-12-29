import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WikiService } from '../../services/wiki.service';
import { inject } from '@angular/core';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { WikiState } from './wiki.reducer';
import { Store } from '@ngrx/store';
import { wikiActions } from './wiki.actions';

export const loadWiki = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadExtract),
      tap(() => {
        store.dispatch(wikiActions.setIsLoading({ isLoading: true }))
        console.log('isLoading -> true');
      }),
      exhaustMap(({ title }) =>
        wikiService.fetchWikiSummary(title).pipe(
          map((value: { extract: string }) => wikiActions.loadExtractSuccess(value)),
          catchError((error: { message: string }) => of(wikiActions.loadExtractError(error))),
          finalize(() => {
            store.dispatch(wikiActions.setIsLoading({ isLoading: false }))
            console.log('isLoading -> false');
          })
        )
      )
    );
  },
  { functional: true }
);
