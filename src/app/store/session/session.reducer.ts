import { createFeature, createReducer, on } from '@ngrx/store';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';
import { processedEvent } from './session.text';
import { initCharWraps } from './session.utils';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.startSession, (state, { content }) => ({
      ...state,
      start: new Date(),
      end: new Date(),
      sessionChars: initCharWraps(content)
    })),
    on(sessionActions.handleKeyPressed, (state, { event }) => processedEvent(state, event))
  )
});
