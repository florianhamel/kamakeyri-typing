import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const { selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(
  selectExp,
  (exp) => Math.floor(new Date().getTime() / 1000) < (exp ?? -Infinity)
);
