import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const dialogActions = createActionGroup({
  source: 'dialog',
  events: {
    openLogIn: emptyProps(),
    updateLogInDialogId: props<{ logInDialogId: string | null }>(),
  }
});
