import { createFeature, createReducer } from '@ngrx/store';
import { initialState } from './training.state';

export const trainingFeature = createFeature({
  name: 'training',
  reducer: createReducer(initialState)
});
