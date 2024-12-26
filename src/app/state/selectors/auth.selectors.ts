import { createSelector } from '@ngrx/store';
import { authFeature } from '../reducers/auth.reducer';

export const { selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => isTokenExpired(exp));

function isTokenExpired(exp: string | null): boolean {
  const expVal = exp ? +exp : -Infinity;
  return Math.floor(new Date().getTime() / 1000) < expVal;
}
