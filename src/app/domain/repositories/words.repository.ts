import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export type WordsRepository = {
  findCommonWords(): Observable<ReadonlyArray<string>>;
};

export const WORDS_REPOSITORY = new InjectionToken<WordsRepository>('WordsRepository');
