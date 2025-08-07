import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, provideStore } from '@ngrx/store';

import { sessionFeature } from '../../../../state/reducers/session.reducer';
import { selectIsLoading } from '../../../../state/selectors/session.selectors';
import { SessionComponent } from './session.component';

describe('SessionComponent', () => {
  let fixture: ComponentFixture<SessionComponent>;
  let component: SessionComponent;
  let store: Store;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore<any>({
          session: sessionFeature.reducer
        })
      ]
    });

    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges;

    store = TestBed.inject(Store);
  });

  it('should create SessionComponent', () => {
    const t = store.selectSignal(selectIsLoading);
    console.log(t());

    const sessionReducer = sessionFeature.reducer;

    expect(component).toBeTruthy();
  });
});
