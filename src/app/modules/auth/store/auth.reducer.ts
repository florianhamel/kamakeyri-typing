import { createFeature, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { initialState } from './auth.state';
import { AuthState } from '../../../common/types';
import { createRehydrateReducer } from '../../../common/storage';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydrateReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (_, userInfo) => ({ ...userInfo }))
  )
});
