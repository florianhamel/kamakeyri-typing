import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { closeLogInDialog, openLogIn } from './core/state/effects/dialog.effects';
import { sessionClearSaved, sessionClose, sessionLoadAll, sessionUploadAllSaved } from './core/state/effects/session.effects';
import { userLogIn, userUpdateLang } from './core/state/effects/user.effects';
import { wikiLoadExtract, wikiLoadRandomExtract, wikiLoadRelatedExtract } from './core/state/effects/wiki.effects';
import { loadCommonWords } from './core/state/effects/words.effects';
import { dialogFeature } from './core/state/reducers/dialog.reducer';
import { featureToggleFeature } from './core/state/reducers/feature-toggle.reducer';
import { sessionFeature } from './core/state/reducers/session.reducer';
import { userFeature } from './core/state/reducers/user.reducer';
import { wikiFeature } from './core/state/reducers/wiki.reducer';
import { wordsFeature } from './core/state/reducers/words.reducer';
import { SESSION_REPOSITORY } from './domain/repositories/session.repository';
import { SessionHttpRepository } from './core/http/session-http.repository';
import { WORDS_REPOSITORY } from './domain/repositories/words.repository';
import { WordsHttpRepository } from './core/http/words-http.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { UserHttpRepository } from './core/http/user-http.repository';
import { WIKI_REPOSITORY } from './domain/repositories/wiki.repository';
import { WikiHttpRepository } from './core/http/wiki-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: SESSION_REPOSITORY, useClass: SessionHttpRepository },
    { provide: WORDS_REPOSITORY, useClass: WordsHttpRepository },
    { provide: USER_REPOSITORY, useClass: UserHttpRepository },
    { provide: WIKI_REPOSITORY, useClass: WikiHttpRepository },
    provideStore({
      [sessionFeature.name]: sessionFeature.reducer,
      [wikiFeature.name]: wikiFeature.reducer,
      [userFeature.name]: userFeature.reducer,
      [dialogFeature.name]: dialogFeature.reducer,
      [wordsFeature.name]: wordsFeature.reducer,
      [featureToggleFeature.name]: featureToggleFeature.reducer
    }),
    provideEffects({
      wikiLoadExtract,
      wikiLoadRelatedExtract,
      wikiLoadRandomExtract,
      sessionClose,
      sessionUploadAllSaved,
      sessionClearSaved,
      sessionLoadAll,
      closeLogInDialog,
      loadCommonWords,
      openLogIn,
      userLogIn,
      userUpdateLang
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
      })
    }),
    provideAnimations(),
    provideCharts(withDefaultRegisterables()),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    })
  ]
};
