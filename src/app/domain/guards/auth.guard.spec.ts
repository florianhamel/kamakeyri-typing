import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectIsLoggedIn } from '../../state/selectors/user.selectors';

describe('AuthGuard', () => {
  let router: Router;
  let mockStore: MockStore;

  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        provideMockStore({
          initialState: {},
          selectors: [{ selector: selectIsLoggedIn, value: false }]
        })
      ]
    });

    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
  });

  it('SHOULD redirect to home WHEN accessing dashboard not being logged in', async () => {
    // given
    mockStore.overrideSelector(selectIsLoggedIn, false);

    // when
    const output = TestBed.runInInjectionContext(() => AuthGuard(route, state));

    // then
    expect(output).toEqual(router.createUrlTree(['/']));
  });

  it('SHOULD return true WHEN accessing dashboard being logged in', async () => {
    // given
    mockStore.overrideSelector(selectIsLoggedIn, true);

    // when
    const output = TestBed.runInInjectionContext(() => AuthGuard(route, state));

    // then
    expect(output).toBe(true);
  });
});
