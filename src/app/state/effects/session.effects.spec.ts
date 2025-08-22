import { Subscription, of, throwError } from 'rxjs';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/helpers/storage.helper';
import { generateSession, generateSessionData } from '../../application/mocks/factories.tools';
import { MockSessionStorageService } from '../../application/mocks/mock-session-storage.service';
import { generateMock } from '../../application/mocks/mocking.tools';
import { SessionService } from '../../application/services/session.service';
import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';
import { Session, SessionData, SessionMetaData } from '../../domain/types/session.types';
import { sessionActions } from '../actions/session.actions';
import { selectSessionData } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/user.selectors';
import { initialState } from '../states/session.state';
import { sessionClose, sessionUploadAllSaved } from './session.effects';

describe('session effects', () => {
  const sessionRefined: SessionData = generateSessionData();
  const mockSessionService: jest.Mocked<SessionService> = generateMock<SessionService>('saveSessions');
  let mockStore: MockStore;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectSessionData, value: sessionRefined },
            { selector: selectIsLoggedIn, value: false }
          ]
        }),
        { provide: SessionService, useValue: mockSessionService },
        { provide: window.sessionStorage, useClass: MockSessionStorageService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    mockStore = TestBed.inject(MockStore);
    clearSessionItems();
  });

  afterEach(() => {
    subscription?.unsubscribe();
  });

  it('should save session without deleting session helpers', () => {
    // given
    const sessionDto: Session = generateSession();
    setSessionItem('sessions', [sessionDto]);
    const metaData: SessionMetaData = {
      mode: SessionMode.Wiki,
      label: 'coffee',
      option: SessionOption.Search,
      lang: 'en'
    };
    const actions$ = of(sessionActions.close(metaData));

    // when
    subscription = sessionClose(actions$, mockSessionService, mockStore).subscribe();

    // then
    expect(mockSessionService.saveSessions).not.toHaveBeenCalled();
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items?.length).toBe(2);
    expect(items).toEqual([{ ...sessionDto }, { ...sessionRefined, ...metaData }]);
  });

  it('should store session when upload error', () => {
    // given
    const metaData: SessionMetaData = {
      mode: SessionMode.Wiki,
      label: 'coffee',
      option: SessionOption.Search,
      lang: 'en'
    };
    const actions$ = of(sessionActions.close(metaData));
    mockSessionService.saveSessions.mockImplementation(() => throwError(() => new Error('upload session error')));

    // when
    sessionClose(actions$, mockSessionService as unknown as SessionService, mockStore).subscribe();

    // then
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items).not.toBe(null);
    expect(items!.length).toBe(1);
    expect(items!.at(0)).toEqual({ ...sessionRefined, ...metaData });
  });

  it('should clean session helpers after uploadAll', () => {
    // given
    const sessionDtos: Array<Session> = [generateSession(), generateSession()];
    setSessionItem('sessions', sessionDtos);
    const actions$ = of(sessionActions.uploadAllSaved());
    const mockSessionService = {
      saveSessions: jest.fn().mockImplementation(() => of(undefined))
    };

    // when
    sessionUploadAllSaved(actions$, mockSessionService as unknown as SessionService).subscribe();

    // then
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items).toBeNull();
  });
});
