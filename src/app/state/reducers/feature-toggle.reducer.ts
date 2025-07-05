import { createFeature, createReducer } from '@ngrx/store';
import { FeatureToggleState, initialState } from '../states/feature-toggle.state';

export const featureToggleFeature = createFeature<'featureToggle', FeatureToggleState>({
  name: 'featureToggle',
  reducer: createReducer<FeatureToggleState>(initialState)
});
