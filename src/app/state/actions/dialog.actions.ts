import { createActionGroup, emptyProps } from '@ngrx/store';

export const dialogActions = createActionGroup({
  source: 'dialog',
  events: {
    openLogIn: emptyProps()
  }
})
