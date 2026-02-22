import { createSelector } from '@ngrx/store';
import { userFeature } from '../reducers/user.reducer';

export const { selectExp, selectUsername, selectLang, selectUserState } = userFeature;

export const selectIsLoggedIn = createSelector(selectExp, (exp) => isTokenExpired(exp));

function isTokenExpired(exp: string | null | undefined): boolean {
  return Date.now() < (exp ? +exp : -Infinity);
}
