import {
  TranslateLoader,
  TranslateService,
  TranslationObject,
  provideTranslateLoader,
  provideTranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { sessionFeature } from '../../../../state/reducers/session.reducer';
import { userFeature } from '../../../../state/reducers/user.reducer';
import { SessionDataComponent } from './session-data.component';
import { SessionDataComponentHarness } from './session-data.component.harness';

@Component({
  imports: [SessionDataComponent],
  template: `<kw-session-data /> `,
  standalone: true
})
class TestHost {}

class CustomTranslateLoader extends TranslateLoader {
  override getTranslation(_: string): Observable<TranslationObject> {
    return of({});
  }
}

describe('SessionDataComponent', () => {
  let fixture: ComponentFixture<TestHost>;
  let loader: HarnessLoader;

  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore({ session: sessionFeature.reducer, user: userFeature.reducer }),
        provideTranslateService({ loader: provideTranslateLoader(CustomTranslateLoader) })
      ]
    });

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    translateService = TestBed.inject(TranslateService);
  });

  it('should', async () => {
    const harness = await loader.getHarness(SessionDataComponentHarness);
    console.log('innerHTML', await harness.debugInnerHTML());
  });
});
