import { DialogState, initialState } from '../states/dialog.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { dialogActions } from '../actions/dialog.actions';

export const dialogFeature = createFeature<'dialog', DialogState>({
  name: 'dialog',
  reducer: createReducer<DialogState>(
    initialState,
    on(dialogActions.updateLogInDialogId, (state, { logInDialogId }) => ({ ...state, logInDialogId }))
  )
});
