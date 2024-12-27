import { createFeature, on } from '@ngrx/store';
import { authActions } from '../actions/auth.actions';
import { createRehydrateReducer } from '../../application/helpers/storage.helper';
import { AuthState, initialState } from '../states/auth.state';

export const authFeature = createFeature({
  name: 'auth',
  reducer: createRehydrateReducer<AuthState>(
    'authState',
    initialState,
    on(authActions.logInSuccess, (_, authInfo) => ({ ...authInfo }))
  )
});
