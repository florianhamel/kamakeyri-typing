import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { WikiSummary } from '../types/wiki.type';

export type WikiRepository = {
  fetchSummary(label: string): Observable<WikiSummary>;
  fetchRelatedSummary(label: string): Observable<WikiSummary>;
  fetchRandomSummary(): Observable<WikiSummary>;
};

export const WIKI_REPOSITORY = new InjectionToken<WikiRepository>('WikiRepository');
