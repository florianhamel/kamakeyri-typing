import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { sessionFeature } from './store/session/session.reducer';
import { provideEffects } from '@ngrx/effects';
import { wikiLoadExtract } from './store/wiki/wiki.effects';
import { wikiFeature } from './store/wiki/wiki.reducer';
import { sessionCheckStatus } from './store/session/session.effects';

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
      wiki: wikiFeature.reducer
    }),
    provideEffects({
      wikiLoadExtract,
      sessionCheckStatus
    }),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation()))
  ]
};
