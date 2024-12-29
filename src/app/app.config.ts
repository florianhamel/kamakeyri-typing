import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { authFeature } from './state/reducers/auth.reducer';
import { authLogIn } from './state/effects/auth.effects';
import { sessionFeature } from './state/reducers/session.reducer';
import { wikiFeature } from './state/reducers/wiki.reducer';
import { wikiLoadExtract, wikiLoadRandomExtract, wikiLoadRelatedExtract } from './state/effects/wiki.effects';
import { sessionUploadAllSaved, sessionUploadOrSave } from './state/effects/session.effects';
import { dialogFeature } from './state/reducers/dialog.reducer';
import { closeLogInDialog, openLogIn } from './state/effects/dialog.effects';
import { loadCommonWords } from './state/effects/words.effects';
import { wordsFeature } from './state/reducers/words.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
      auth: authFeature.reducer,
      dialog: dialogFeature.reducer,
      words: wordsFeature.reducer
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
      authLogIn
    }),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideAnimations(),
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
