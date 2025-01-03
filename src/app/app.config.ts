import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { sessionFeature } from './modules/session/store/session.reducer';
import { wikiFeature } from './modules/wiki/store/wiki.reducer';
import { authFeature } from './modules/auth/store/auth.reducer';
import { trainingFeature } from './modules/training/store/training.reducer';
import { wikiLoadExtract, wikiLoadRandomExtract, wikiLoadRelatedExtract } from './modules/wiki/store/wiki.effects';
import { sessionUpload, sessionUploadAll } from './modules/session/store/session.effects';
import { authLogIn } from './modules/auth/store/auth.effects';

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
      training: trainingFeature.reducer
    }),
    provideEffects({
      wikiLoadExtract,
      wikiLoadRelatedExtract,
      wikiLoadRandomExtract,
      sessionUpload,
      sessionUploadAll,
      authLogIn
    }),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
    provideAnimations()
  ]
};
