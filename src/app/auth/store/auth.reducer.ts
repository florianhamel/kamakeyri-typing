import { createFeature, on } from '@ngrx/store';
import { createHydrateReducer as createHydratedReducer } from '../../common/local-storage';
import { AuthState } from '../../common/types';
import { authActions } from './auth.actions';
import { initialState } from './auth.state';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createHydratedReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (state, userInfo) => ({ ...state, username: userInfo.username, exp: userInfo.exp }))
  )
});
