import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';

import { SessionService } from '../../../../application/services/session.service';
import { SessionMode } from '../../../../domain/enums/session-mode.enum';
import { SessionOption } from '../../../../domain/enums/session-option.enum';
import { SessionMetaData } from '../../../../domain/types/session.types';
import { sessionClose } from '../../../../state/effects/session.effects';
import { sessionFeature } from '../../../../state/reducers/session.reducer';
import { userFeature } from '../../../../state/reducers/user.reducer';
import { selectStatus } from '../../../../state/selectors/session.selectors';
import { SessionState, initialState as sessionInitialState } from '../../../../state/states/session.state';
import { UserState, initialState as userInitialState } from '../../../../state/states/user.state';
import { SessionComponent } from './session.component';
import { SessionComponentHarness } from './session.component.harness';

@Component({
  template: ` <div>
    <kw-session [source]="source" [metaData]="metaData"></kw-session>
  </div>`,
  imports: [SessionComponent],
  standalone: true
})
class TestHost {
  protected readonly source = 'hey';
  protected readonly metaData: SessionMetaData = {
    mode: SessionMode.CommonWords,
    label: 'label',
    option: SessionOption.WordLimit,
    lang: 'en'
  };
}

describe('SessionComponent', () => {
  function setup(session: Partial<SessionState> = {}, user: Partial<UserState> = {}) {
    TestBed.configureTestingModule({
      providers: [
        provideStore(
          { session: sessionFeature.reducer, user: userFeature.reducer },
          { initialState: { session: { ...sessionInitialState, ...session }, user: { ...userInitialState, ...user } } }
        ),
        provideEffects({ sessionUploadOrSave: sessionClose }),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    const hostFixture = TestBed.createComponent(TestHost);
    const hostComponent = hostFixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(hostFixture);
    const store = TestBed.inject(Store);
    const httpController = TestBed.inject(HttpTestingController);

    return { hostFixture, hostComponent, loader, store, httpController };
  }

  it('should textarea be focused when session component view is rendered', async () => {
    // given
    const { loader } = setup();

    // when
    const sessionHarness = await loader.getHarness(SessionComponentHarness);

    // then
    expect(await sessionHarness.isTextareaFocused()).toBe(true);
  });

  it('should upload session when text is typed and user logged in', async () => {
    const { loader, store, httpController } = setup({}, { username: 'nerium', exp: '12345678987654321' });
    const sessionHarness = await loader.getHarness(SessionComponentHarness);
    const status = store.selectSignal(selectStatus);

    expect(status()).toBe('notStarted');

    await fireKeyboardEvents(sessionHarness, 'h');
    expect(status()).toBe('inProgress');

    await fireKeyboardEvents(sessionHarness, 'e', 'y');
    expect(status()).toBe('closed');

    const request = httpController.expectOne({ method: 'POST', url: SessionService.url }).request;
    expect(request.body).toEqual([
      {
        time: expect.any(Number),
        length: 3,
        keystrokes: 3,
        errors: 0,
        mode: SessionMode.CommonWords,
        label: 'label',
        option: SessionOption.WordLimit,
        lang: 'en'
      }
    ]);
  });

  it('should store session when text is typed but user not logged in', async () => {
    const { loader, store, httpController } = setup({}, { username: 'nerium', exp: '12345678987654321' });
    const sessionHarness = await loader.getHarness(SessionComponentHarness);
    const status = store.selectSignal(selectStatus);

    expect(status()).toBe('notStarted');

    await fireKeyboardEvents(sessionHarness, 'h');
    expect(status()).toBe('inProgress');

    await fireKeyboardEvents(sessionHarness, 'e', 'y');
    expect(status()).toBe('closed');

    const request = httpController.expectOne({ method: 'POST', url: SessionService.url }).request;
    expect(request.body).toEqual([
      {
        time: expect.any(Number),
        length: 3,
        keystrokes: 3,
        errors: 0,
        mode: SessionMode.CommonWords,
        label: 'label',
        option: SessionOption.WordLimit,
        lang: 'en'
      }
    ]);
  });

  async function fireKeyboardEvents(sessionHarness: SessionComponentHarness, ...keys: string[]) {
    for (const key of keys) {
      await sessionHarness.fireKeyboardEvent(key);
    }
  }
});
