import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../state/selectors/user.selectors';

export const AuthGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);

  return isLoggedIn() ? true : router.createUrlTree(['/']);
};
