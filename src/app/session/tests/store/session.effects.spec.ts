import { sessionUpload } from '../../store/session.effects';
import { of, throwError } from 'rxjs';
import { sessionActions } from '../../store/session.actions';
import { SessionDto, SessionMetaData, SessionRefined } from '../../models/session.types';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/session.state';
import { SessionService } from '../../services/session.service';
import { selectSessionRefined } from '../../store/session.selectors';
import { MockSessionStorageService } from '../../../mocks/mock-session-storage.service';
import { getSessionItem } from '../../../common/storage';

describe('session effects', () => {
  const sessionRefined: SessionRefined = { time: 200, length: 100, keystrokes: 120, errors: 120 };
  let mockStore: MockStore;
  let mockSessionService: SessionService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState,
          selectors: [{ selector: selectSessionRefined, value: sessionRefined }]
        }),
        { provide: window.sessionStorage, useClass: MockSessionStorageService },
        {
          provide: SessionService,
          useValue: {
            uploadSession: () => throwError(() => new Error('upload session error'))
          }
        }
      ]
    });
    mockStore = TestBed.inject(MockStore);
    mockSessionService = TestBed.inject(SessionService);
  });

  it('should save session if error', () => {
    // given
    const metaData: SessionMetaData = { mode: 'wiki', label: 'coffee', option: 'search' };
    const actions$ = of(sessionActions.upload(metaData));

    // when
    sessionUpload(actions$, mockSessionService, mockStore).subscribe();

    // then
    const sessionDtos: Array<SessionDto> | null = getSessionItem('sessions');
    expect(sessionDtos).not.toBe(null);
    expect(sessionDtos!.length).toBe(1);
    expect(sessionDtos!.at(0)).toEqual({ ...sessionRefined, ...metaData, type: sessionActions.upload.type });
  });
});
