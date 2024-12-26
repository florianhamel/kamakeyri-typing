import { createSelector } from '@ngrx/store';
import { authFeature } from '../reducers/auth.reducer';

export const { selectExp, selectAuthState } = authFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => isTokenExpired(exp));

function isTokenExpired(exp: string | null): boolean {
  return Date.now() < (exp ? +exp : -Infinity);
}
