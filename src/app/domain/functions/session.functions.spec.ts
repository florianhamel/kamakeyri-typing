import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionChar } from '../../models/session.types';
import { initSessionChars } from '../../functions/session-common.functions';
import { isUsInternational } from '../../../../common/layouts/us-international-layout';
import { initialState } from '../../store/session.state';

describe('text session', () => {
  beforeEach(() => {
    const sessionChars: ReadonlyArray<SessionChar> = initSessionChars('Hello World!', isUsInternational);
    const sessionState = { ...initialState, sessionChars };
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: { ...initialState, sessionChars } })]
    });
  });
});
