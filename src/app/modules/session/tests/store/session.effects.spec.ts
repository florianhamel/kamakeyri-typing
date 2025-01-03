import { sessionUpload, sessionUploadAll } from '../../store/session.effects';
import { of, throwError } from 'rxjs';
import { sessionActions } from '../../store/session.actions';
import { SessionDto, SessionMetaData, SessionRefined } from '../../models/session.types';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/session.state';
import { SessionService } from '../../services/session.service';
import { selectSessionRefined } from '../../store/session.selectors';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockSessionStorageService } from '../../../../mocks/mock-session-storage.service';
import { clearSessionItems, getSessionItem, setSessionItem } from '../../../../common/storage';
import { selectIsLoggedIn } from '../../../auth/store/auth.selectors';
import { generateMock } from '../../../../mocks/mocking.tools';
import { generateSessionDto, generateSessionRefined } from '../../../../mocks/factories.tools';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('session effects', () => {
  const sessionRefined: SessionRefined = generateSessionRefined();
  const sessionServiceMock: jest.Mocked<SessionService> =
    generateMock<SessionService>('uploadSessions');
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        provideMockStore({
            initialState,
            selectors: [
                { selector: selectSessionRefined, value: sessionRefined },
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

  it('should save session without deleting session storage', () => {
    // given
    const sessionDto: SessionDto = generateSessionDto();
    setSessionItem('sessions', [sessionDto]);
    const metaData: SessionMetaData = { mode: 'wiki', label: 'coffee', option: 'search' };
    const actions$ = of(sessionActions.upload(metaData));

    // when
    sessionUpload(actions$, sessionServiceMock, mockStore).subscribe();

    // then
    expect(sessionServiceMock.uploadSessions).not.toHaveBeenCalled();
    const items: Array<SessionDto> | null = getSessionItem('sessions');
    expect(items?.length).toBe(2);
    expect(items).toEqual([{ ...sessionDto }, { ...sessionRefined, ...metaData }]);
  });

  it('should save session if upload error', () => {
    // given
    const metaData: SessionMetaData = { mode: 'wiki', label: 'coffee', option: 'search' };
    const actions$ = of(sessionActions.upload(metaData));
    sessionServiceMock.uploadSessions.mockImplementation(() =>
      throwError(() => new Error('upload session error'))
    );

    // when
    sessionUpload(actions$, sessionServiceMock as unknown as SessionService, mockStore).subscribe();

    // then
    const items: Array<SessionDto> | null = getSessionItem('sessions');
    expect(items).not.toBe(null);
    expect(items!.length).toBe(1);
    expect(items!.at(0)).toEqual({ ...sessionRefined, ...metaData });
  });

  it('should clean session storage after uploadAll', () => {
    // given
    const sessionDtos: Array<SessionDto> = [generateSessionDto(), generateSessionDto()];
    setSessionItem('sessions', sessionDtos);
    const actions$ = of(sessionActions.uploadAll());
    const mockSessionService = {
      uploadSessions: jest.fn().mockImplementation(() => of(undefined))
    };

    // when
    sessionUploadAll(actions$, mockSessionService as unknown as SessionService).subscribe();

    // then
    const items: Array<SessionDto> | null = getSessionItem('sessions');
    expect(items).toBeNull();
  });
});
