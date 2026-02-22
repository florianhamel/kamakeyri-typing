import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { wordsActions } from '../state/actions/words.actions';
import { selectCommonWords, selectIsLoading, selectRandomWords } from '../state/selectors/words.selectors';

@Injectable({
  providedIn: 'root'
})
export class WordsFacade {
  constructor(private readonly store: Store) {}

  selectCommonWords(): Signal<ReadonlyArray<string>> {
    return this.store.selectSignal(selectCommonWords);
  }

  selectRandomWords(): Signal<ReadonlyArray<string>> {
    return this.store.selectSignal(selectRandomWords);
  }

  selectIsLoading(): Signal<boolean> {
    return this.store.selectSignal(selectIsLoading);
  }

  loadCommonWords(): void {
    this.store.dispatch(wordsActions.loadCommonWords());
  }

  generateRandomWords(limit: number): void {
    this.store.dispatch(wordsActions.generateRandomWords({ limit }));
  }

  setIsLoading(isLoading: boolean): void {
    this.store.dispatch(wordsActions.setIsLoading({ isLoading }));
  }
}
