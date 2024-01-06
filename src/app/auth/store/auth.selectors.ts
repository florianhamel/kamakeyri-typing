import { authFeature } from './auth.reducer';
import { createSelector } from '@ngrx/store';

export const { selectUsername, selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => new Date().getTime() < (exp ?? -Infinity));
