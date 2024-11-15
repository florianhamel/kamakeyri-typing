import { createFeature, createReducer, on } from '@ngrx/store';
import {
  processedBackspace,
  processedBackspaceSeq,
  processedExtensionSeq,
  processedStandard,
  processedStarter,
  processedStarterSeq
} from '../functions/text.session';
import {
  firstIndex,
  initSessionChars,
  isSequenceExtension,
  isStarter,
  resetSessionChars
} from '../functions/common.session';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';
import { SessionChar, SessionState } from '../models/session.types';
import {
  isUsInternational,
  usInternationalSequences,
  usInternationalStarters
} from '../../../common/layouts/us-international.layout';
import { isBackspace } from '../../../common/checks/keyboard-event.checks';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => initialized(content)),
    on(sessionActions.update, (state, { event }) => updated(state, event)),
    on(sessionActions.start, (state) => started(state)),
    on(sessionActions.reset, (state) => reset(state)),
    on(sessionActions.close, (state) => closed(state)),
  )
});

export function initialized(content: string): SessionState {
  const sessionChars: ReadonlyArray<SessionChar> = initSessionChars(content, isUsInternational);
  return {
    start: null,
    end: null,
    index: firstIndex(sessionChars),
    sessionChars,
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
  if (isBackspace(event)) return processedBackspace(state, event);
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
    index: 0,
    sessionChars: resetSessionChars(state.sessionChars),
    keystrokes: 0,
    errors: 0,
    status: 'notStarted'
  };
}

export function closed(state: SessionState): SessionState {
  return { ...state, end: new Date(), status: 'closed' };
}
