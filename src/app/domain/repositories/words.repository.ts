import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface WordsRepository {
  findCommonWords(): Observable<ReadonlyArray<string>>;
}

export const WordsRepository = new InjectionToken<WordsRepository>('WordsRepository');
