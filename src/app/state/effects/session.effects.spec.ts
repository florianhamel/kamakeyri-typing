import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { generateSessionDto, generateSessionData } from '../../application/mocks/factories.tools';
import { SessionService } from '../../application/services/session.service';
import { generateMock } from '../../application/mocks/mocking.tools';
import { initialState } from '../states/session.state';
import { selectIsLoggedIn } from '../selectors/user.selectors';
import { MockSessionStorageService } from '../../application/mocks/mock-session-storage.service';
import { Session, SessionData, SessionMetaData } from '../../domain/types/session.types';
import { selectSessionData } from '../selectors/session.selectors';
import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/helpers/storage.helper';
import { sessionActions } from '../actions/session.actions';
import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';
import { sessionUploadAllSaved, sessionUploadOrSave } from './session.effects';

describe('session effects', () => {
  const sessionRefined: SessionData = generateSessionData();
  const sessionServiceMock: jest.Mocked<SessionService> = generateMock<SessionService>('uploadSessions');
  let mockStore: MockStore;

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
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: window.sessionStorage, useClass: MockSessionStorageService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    mockStore = TestBed.inject(MockStore);
    clearSessionItems();
  });

  it('should save session without deleting session helpers', () => {
    // given
    const sessionDto: Session = generateSessionDto();
    setSessionItem('sessions', [sessionDto]);
    const metaData: SessionMetaData = {
      mode: SessionMode.Wiki,
      label: 'coffee',
      option: SessionOption.Search
    };
    const actions$ = of(sessionActions.uploadOrSave(metaData));

    // when
    sessionUploadOrSave(actions$, sessionServiceMock, mockStore).subscribe();

    // then
    expect(sessionServiceMock.uploadSessions).not.toHaveBeenCalled();
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items?.length).toBe(2);
    expect(items).toEqual([{ ...sessionDto }, { ...sessionRefined, ...metaData }]);
  });

  it('should save session if upload error', () => {
    // given
    const metaData: SessionMetaData = { mode: SessionMode.Wiki, label: 'coffee', option: SessionOption.Search };
    const actions$ = of(sessionActions.uploadOrSave(metaData));
    sessionServiceMock.uploadSessions.mockImplementation(() => throwError(() => new Error('upload session error')));

    // when
    sessionUploadOrSave(actions$, sessionServiceMock as unknown as SessionService, mockStore).subscribe();

    // then
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items).not.toBe(null);
    expect(items!.length).toBe(1);
    expect(items!.at(0)).toEqual({ ...sessionRefined, ...metaData });
  });

  it('should clean session helpers after uploadAll', () => {
    // given
    const sessionDtos: Array<Session> = [generateSessionDto(), generateSessionDto()];
    setSessionItem('sessions', sessionDtos);
    const actions$ = of(sessionActions.uploadAllSaved());
    const mockSessionService = {
      uploadSessions: jest.fn().mockImplementation(() => of(undefined))
    };

    // when
    sessionUploadAllSaved(actions$, mockSessionService as unknown as SessionService).subscribe();

    // then
    const items: Array<Session> | null = getSessionItem('sessions');
    expect(items).toBeNull();
  });
});
