import { createFeature, on } from '@ngrx/store';
import { userActions } from '../actions/user.actions';
import { createRehydrateReducer } from '../../application/helpers/storage.helper';
import { initialState, UserState } from '../states/user.state';

export const userFeature = createFeature({
  name: 'user',
  reducer: createRehydrateReducer<UserState>(
    'userState',
    initialState,
    on(userActions.logInSuccess, (_, userInfo) => ({ ...userInfo })),
    on(userActions.reset, (_) => ({ ...initialState })),
    on(userActions.updateLangSuccess, (state, { lang }) => ({ ...state, lang }))
  )
});
