import { createFeature, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { initialState } from './auth.state';
import { createRehydrateReducer } from '../../../common/storage';
import { AuthState } from '../models/auth.types';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydrateReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (_, authInfo) => ({ ...authInfo }))
  )
});
