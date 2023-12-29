import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState } from './typing.state';
import { typingActions } from './typing.actions';
import { CharWrap } from '../../models/types';

export const typingFeature = createFeature({
  name: 'typing',
  reducer: createReducer(
    initialState,
    on(typingActions.startSession, (state, { content }) => ({
      ...state,
      start: new Date(),
      end: new Date(),
      charWraps: buildCharWraps(content)
    }))
  )
});

function buildCharWraps(content: string): ReadonlyArray<CharWrap> {
  return [...content].map((char) => ({ source: char, input: null, sequence: null }));
}
