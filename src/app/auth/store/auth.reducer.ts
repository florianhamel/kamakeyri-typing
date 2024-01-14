import { createFeature, on } from '@ngrx/store';
import { createHydrateReducer as createRehydratedReducer } from '../../common/storage';
import { AuthState } from '../../common/types';
import { authActions } from './auth.actions';
import { initialState } from './auth.state';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydratedReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (_, userInfo) => ({ ...userInfo }))
  )
});
