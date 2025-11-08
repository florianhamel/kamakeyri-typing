import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { SessionOption } from '../constants/session-option.const';
import { WikiLang } from '../types/wiki.type';
import { wikiActions } from '../../state/actions/wiki.actions';
import {
  selectExtract,
  selectIsLoading,
  selectOption,
  selectTitle,
  selectWikiLang,
  selectWikiState
} from '../../state/selectors/wiki.selectors';
import { WikiState } from '../../state/states/wiki.state';

@Injectable({
  providedIn: 'root'
})
export class WikiFacade {
  constructor(private readonly store: Store) {}

  selectTitle(): Signal<string | null> {
    return this.store.selectSignal(selectTitle);
  }

  selectExtract(): Signal<string | null> {
    return this.store.selectSignal(selectExtract);
  }

  selectIsLoading(): Signal<boolean> {
    return this.store.selectSignal(selectIsLoading);
  }

  selectWikiState(): Signal<WikiState> {
    return this.store.selectSignal(selectWikiState);
  }

  selectOption(): Signal<SessionOption | null> {
    return this.store.selectSignal(selectOption);
  }

  selectWikiLang(): Signal<WikiLang> {
    return this.store.selectSignal(selectWikiLang);
  }

  setIsLoading(isLoading: boolean): void {
    this.store.dispatch(wikiActions.setIsLoading({ isLoading }));
  }

  loadSearchSummary(label: string): void {
    this.store.dispatch(wikiActions.loadSearchSummary({ label }));
  }

  loadRelatedSummary(label: string): void {
    this.store.dispatch(wikiActions.loadRelatedSummary({ label }));
  }

  loadRandomSummary(): void {
    this.store.dispatch(wikiActions.loadRandomSummary());
  }

  loadSummary(mode: SessionOption, label: string | null): void {
    this.store.dispatch(wikiActions.loadSummary({ mode, label }));
  }

  saveWikiSession(): void {
    this.store.dispatch(wikiActions.saveWikiSession());
  }

  updateWikiLang(wikiLang: WikiLang): void {
    this.store.dispatch(wikiActions.updateWikiLang({ wikiLang }));
  }
}
