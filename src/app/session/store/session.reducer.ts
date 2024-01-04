import { createFeature, createReducer, on } from '@ngrx/store';
import { isBackspace } from '../../common/checks/keyboard-event.checks';
import {
  isUsInternational,
  usInternationalSequences,
  usInternationalStarters
} from '../../common/layouts/us-international.layout';
import { SessionState } from '../../common/types';
import {
  processedBackspace,
  processedBackspaceSeq,
  processedExtensionSeq,
  processedStandard,
  processedStarter,
  processedStarterSeq
} from '../utils/text';
import { initSessionChars, isSequenceExtension, isStarter, resetSessionChars } from '../utils/utils';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => initialized(content)),
    on(sessionActions.update, (state, { event }) => updated(state, event)),
    on(sessionActions.start, (state) => started(state)),
    on(sessionActions.reset, (state) => reset(state)),
    on(sessionActions.close, (state) => closed(state)),
    on(sessionActions.updateTimer, (state) => ({ ...state, end: new Date() }))
  )
});

export function initialized(content: string): SessionState {
  return {
    start: null,
    end: null,
    sessionChars: initSessionChars(content, isUsInternational),
    index: 0,
    keystrokes: 0,
    errors: 0,
    status: 'notStarted'
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

export function started(state: SessionState): SessionState {
  return { ...state, start: new Date(), end: new Date(), status: 'inProgress' };
}

export function reset(state: SessionState): SessionState {
  return {
    start: null,
    end: null,
    sessionChars: resetSessionChars(state.sessionChars),
    index: 0,
    keystrokes: 0,
    errors: 0,
    status: 'notStarted'
  };
}

export function closed(state: SessionState): SessionState {
  return { ...state, end: new Date(), status: 'closed' };
}
