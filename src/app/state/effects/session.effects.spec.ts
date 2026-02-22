import { Subscription, of, throwError } from 'rxjs';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/functions/storage.functions';
import { generateSession, generateSessionData } from '../../testing/factories.tools';
import { MockSessionStorageService } from '../../testing/mock-session-storage.service';
import { generateMock } from '../../testing/mocking.tools';
import { sessionMode } from '../../domain/constants/session-mode.const';
import { sessionOption } from '../../domain/constants/session-option.const';
import { Session, SessionData, SessionMetaData } from '../../domain/types/session.type';
import { SessionHttpRepository } from '../../infrastructure/http/session-http.repository';
import { sessionActions } from '../actions/session.actions';
import { selectSessionData } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/user.selectors';
import { initialState } from '../states/session.state';
import { sessionClose, sessionUploadAllSaved } from './session.effects';

describe('session effects', () => {
  const sessionRefined: SessionData = generateSessionData();
  const mockSessionService: jest.Mocked<SessionHttpRepository> = generateMock<SessionHttpRepository>('saveAll');
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
        { provide: SessionHttpRepository, useValue: mockSessionService },
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
      mode: sessionMode.wiki,
      label: 'coffee',
      option: sessionOption.search,
      lang: 'en'
    };
    const actions$ = of(sessionActions.close(metaData));

    // when
    subscription = sessionClose(actions$, mockSessionService, mockStore).subscribe();

    // then
    expect(mockSessionService.saveAll).not.toHaveBeenCalled();
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items?.length).toBe(2);
    expect(items).toEqual([{ ...sessionDto }, { ...sessionRefined, ...metaData }]);
  });

  it('should store session when upload error', () => {
    // given
    const metaData: SessionMetaData = {
      mode: sessionMode.wiki,
      label: 'coffee',
      option: sessionOption.search,
      lang: 'en'
    };
    const actions$ = of(sessionActions.close(metaData));
    mockSessionService.saveAll.mockImplementation(() => throwError(() => new Error('upload session error')));

    // when
    sessionClose(actions$, mockSessionService as unknown as SessionHttpRepository, mockStore).subscribe();

    // then
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items).not.toBe(null);
    expect(items!.length).toBe(1);
    expect(items!.at(0)).toEqual({ ...sessionRefined, ...metaData });
  });

  it('should clean session helpers after uploadAll', () => {
    // given
    const sessionDtos = [generateSession(), generateSession()];
    setSessionItem('sessions', sessionDtos);
    const actions$ = of(sessionActions.uploadAllSaved());
    const mockSessionService = {
      saveSessions: jest.fn().mockImplementation(() => of(undefined))
    } as unknown as SessionHttpRepository;

    // when
    sessionUploadAllSaved(actions$, mockSessionService).subscribe();

    // then
    setTimeout(() => {
      const items = getSessionItem<Array<Session>>('sessions');
      expect(items).toBeNull();
    }, 100); // TODO absolute abomination, refactor to remove the tap() in the effect
  });
});
