import { createFeature, on } from '@ngrx/store';
import { AuthState } from '../../domain/types/auth.types';
import { authActions } from '../actions/auth.actions';
import { createRehydrateReducer } from '../../application/helpers/storage.helper';

export const initialState: AuthState = {
  username: null,
  exp: null
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydrateReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (_, authInfo) => ({ ...authInfo }))
  )
});
