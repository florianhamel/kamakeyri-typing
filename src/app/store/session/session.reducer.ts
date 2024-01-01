import { createFeature, createReducer, on } from '@ngrx/store';
import { SessionState } from '../../models/store.types';
import { exists } from '../../utils/checks/common.checks';
import { isBackspace } from '../../utils/checks/keyboard-event.checks';
import {
  isUsInternational,
  usInternationalSequences,
  usInternationalStarters
} from '../../utils/layouts/us-international.layout';
import {
  processedBackspace,
  processedBackspaceSeq,
  processedExtensionSeq,
  processedStandard,
  processedStarter,
  processedStarterSeq
} from '../../utils/session/text.session';
import { initSessionChars, isSequenceExtension, isStarter, resetSessionChars } from '../../utils/session/utils.session';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => initialized(content)),
    on(sessionActions.update, (state, { event }) => updated(state, event)),
    on(sessionActions.start, (state, { intervalId }) => started(state, intervalId)),
    on(sessionActions.reset, (state) => reset(state)),
    on(sessionActions.updateTimer, (state) => ({ ...state, end: new Date() }))
  )
});

export function initialized(content: string): SessionState {
  return {
    start: null,
    end: null,
    intervalId: null,
    sessionChars: initSessionChars(content, isUsInternational),
    index: 0,
    keystrokes: 0,
    errors: 0
  };
}

export function updated(state: SessionState, event: KeyboardEvent): SessionState {
  if (isSequenceExtension(state)) {
    if (isBackspace(event)) return processedBackspaceSeq(state);
    if (isStarter(event, usInternationalStarters)) return processedStarterSeq(state, event, usInternationalStarters);
    return processedExtensionSeq(state, event, usInternationalSequences);
  }
  if (isBackspace(event)) return processedBackspace(state);
  if (isStarter(event, usInternationalStarters)) return processedStarter(state, event, usInternationalStarters);
  return processedStandard(state, event);
}

export function started(state: SessionState, intervalId: number): SessionState {
  return { ...state, start: new Date(), end: new Date(), intervalId };
}

export function reset(state: SessionState): SessionState {
  if (exists(state.intervalId)) clearInterval(state.intervalId!);
  return {
    start: null,
    end: null,
    intervalId: null,
    sessionChars: resetSessionChars(state.sessionChars),
    index: 0,
    keystrokes: 0,
    errors: 0
  };
}
