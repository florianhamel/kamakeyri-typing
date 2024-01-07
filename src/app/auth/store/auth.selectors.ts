import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const { selectUsername, selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => new Date().getTime() < (exp ?? -Infinity));
