import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectDarkLightToggle, selectWikiRelatedToggle } from '../state/selectors/feature-toggle.selectors';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleFacade {
  constructor(private readonly store: Store) {}

  selectWikiRelatedToggle(): Signal<boolean> {
    return this.store.selectSignal(selectWikiRelatedToggle);
  }

  selectDarkLightToggle(): Signal<boolean> {
    return this.store.selectSignal(selectDarkLightToggle);
  }
}
