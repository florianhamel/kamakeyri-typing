import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WikiService } from '../../services/wiki.service';
import { inject } from '@angular/core';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { wikiActions } from './wiki.actions';
import { WikiState, WikiSummary } from '../../models/types';

export const loadWiki = createEffect(
  (actions$ = inject(Actions), wikiService = inject(WikiService), store = inject(Store<WikiState>)) => {
    return actions$.pipe(
      ofType(wikiActions.loadExtract),
      tap(() => store.dispatch(wikiActions.setIsLoading({ isLoading: true }))),
      exhaustMap(({ title }) =>
        wikiService.fetchWikiSummary(title).pipe(
          map((value: WikiSummary) => wikiActions.loadExtractSuccess(value)),
          catchError((error: { message: string }) => of(wikiActions.loadExtractError())),
          finalize(() => store.dispatch(wikiActions.setIsLoading({ isLoading: false })))
        )
      )
    );
  },
  { functional: true }
);
