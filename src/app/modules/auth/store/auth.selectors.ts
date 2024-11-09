import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const { selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => isTokenExpired(exp));

function isTokenExpired(exp: number | null): boolean {
  return Math.floor(new Date().getTime() / 1000) < (exp ?? -Infinity);
}
