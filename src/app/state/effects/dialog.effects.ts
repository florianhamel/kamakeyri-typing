import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { dialogActions } from '../actions/dialog.actions';
import { first, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { userActions } from '../actions/userActions';
import { concatLatestFrom } from '@ngrx/operators';
import { selectLogInDialogId } from '../selectors/dialog.selectors';
import { LogInComponent } from '../../presentation/components/log-in/log-in.component';

export const openLogIn = createEffect(
  (actions$ = inject(Actions), dialog = inject(MatDialog), store = inject(Store)) => {
    return actions$.pipe(
      ofType(dialogActions.openLogIn),
      map(() => {
        const dialogRef = dialog.open<LogInComponent>(LogInComponent);
        dialogRef
          .afterClosed()
          .pipe(first())
          .subscribe(() => store.dispatch(dialogActions.updateLogInDialogId({ logInDialogId: null })));
        return dialogActions.updateLogInDialogId({ logInDialogId: dialogRef.id });
      })
    );
  },
  { functional: true, dispatch: true }
);

export const closeLogInDialog = createEffect(
  (actions$ = inject(Actions), store = inject(Store), dialog = inject(MatDialog)) => {
    return actions$.pipe(
      ofType(userActions.logInSuccess),
      concatLatestFrom(() => store.select(selectLogInDialogId)),
      tap(([_, id]) => id && dialog.getDialogById(id)?.close())
    );
  },
  { functional: true, dispatch: false }
);
