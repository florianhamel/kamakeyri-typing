import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';

import { sessionMode } from '../../../../domain/constants/session-mode.const';
import { sessionOption } from '../../../../domain/constants/session-option.const';
import { SessionFacade } from '../../../../core/facades/session.facade';
import { SessionMetaData } from '../../../../domain/types/session.type';
import { SessionHttpRepository } from '../../../../core/http/session-http.repository';
import { sessionClose } from '../../../../core/state/effects/session.effects';
import { sessionFeature } from '../../../../core/state/reducers/session.reducer';
import { userFeature } from '../../../../core/state/reducers/user.reducer';
import { selectStatus } from '../../../../core/state/selectors/session.selectors';
import { SessionState, initialState as sessionInitialState } from '../../../../core/state/states/session.state';
import { UserState, initialState as userInitialState } from '../../../../core/state/states/user.state';
import { SessionComponent } from './session.component';
import { SessionComponentHarness } from './session.component.harness';
import { SESSION_REPOSITORY } from '../../../../domain/repositories/session.repository';

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
    mode: sessionMode.words,
    label: 'label',
    option: sessionOption.wordLimit,
    lang: 'en'
  };
}

describe('SessionComponent', () => {
  function setup(session: Partial<SessionState> = {}, user: Partial<UserState> = {}) {
    TestBed.configureTestingModule({
      providers: [
        SessionFacade,
        SessionHttpRepository,
        { provide: SESSION_REPOSITORY, useExisting: SessionHttpRepository },
        provideStore(
          { session: sessionFeature.reducer, user: userFeature.reducer },
          { initialState: { session: { ...sessionInitialState, ...session }, user: { ...userInitialState, ...user } } }
        ),
        provideEffects({ sessionClose }),
        provideHttpClient(),
        provideHttpClientTesting()
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

    const request = httpController.expectOne({ method: 'POST', url: SessionHttpRepository.url }).request;
    expect(request.body).toEqual([
      {
        time: expect.any(Number),
        length: 3,
        keystrokes: 3,
        errors: 0,
        mode: sessionMode.words,
        label: 'label',
        option: sessionOption.wordLimit,
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
