import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideCharts } from 'ng2-charts';

import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { closeLogInDialog, openLogIn } from './state/effects/dialog.effects';
import { sessionUploadAllSaved, sessionUploadOrSave } from './state/effects/session.effects';
import { userLogIn, userUpdateLang } from './state/effects/user.effects';
import { wikiLoadExtract, wikiLoadRandomExtract, wikiLoadRelatedExtract } from './state/effects/wiki.effects';
import { loadCommonWords } from './state/effects/words.effects';
import { dialogFeature } from './state/reducers/dialog.reducer';
import { featureToggleFeature } from './state/reducers/feature-toggle.reducer';
import { sessionFeature } from './state/reducers/session.reducer';
import { userFeature } from './state/reducers/user.reducer';
import { wikiFeature } from './state/reducers/wiki.reducer';
import { wordsFeature } from './state/reducers/words.reducer';

export function TranslateLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export const provideTranslation = (): TranslateModuleConfig => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: TranslateLoaderFactory,
    deps: [HttpClient]
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({
      session: sessionFeature.reducer,
      wiki: wikiFeature.reducer,
      user: userFeature.reducer,
      dialog: dialogFeature.reducer,
      words: wordsFeature.reducer,
      featureToggle: featureToggleFeature.reducer
    }),
    provideEffects({
      wikiLoadExtract,
      wikiLoadRelatedExtract,
      wikiLoadRandomExtract,
      sessionUploadOrSave,
      sessionUploadAllSaved,
      closeLogInDialog,
      loadCommonWords,
      openLogIn,
      userLogIn,
      userUpdateLang
    }),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideAnimations(),
    provideCharts(),
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
