import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { WikiSummary } from '../types/wiki.type';

export interface WikiRepository {
  fetchSummary(label: string): Observable<WikiSummary>;
  fetchRelatedSummary(label: string): Observable<WikiSummary>;
  fetchRandomSummary(): Observable<WikiSummary>;
}

export const WikiRepository = new InjectionToken<WikiRepository>('WikiRepository');
