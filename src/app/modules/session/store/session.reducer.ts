import { createFeature, createReducer, on } from '@ngrx/store';
import { initSessionChars, resetSessionChars } from '../functions/session-common';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';
import { SessionChar, SessionState } from '../models/session.types';
import { isUsInternational } from '../../../common/layouts/us-international.layout';
import { InputEventSanitized } from '../../../common/types';
import {
  processBackspaceChar,
  processComposition,
  processStandard
} from '../functions/session-functions';
import { isBackspace } from '../../../common/checks/input-event.check';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => initialized(content)),
    on(sessionActions.update, (state, { event }) => updated(state, event)),
    on(sessionActions.start, (state) => started(state)),
    on(sessionActions.reset, (state) => reset(state)),
    on(sessionActions.close, (state) => closed(state))
  )
});

export function initialized(content: string): SessionState {
  const sessionChars: ReadonlyArray<SessionChar> = initSessionChars(content, isUsInternational);
  return {
    ...initialState,
    sessionChars
  };
}

export function updated(state: SessionState, event: InputEventSanitized): SessionState {
  if (isBackspace(event)) {
    return processBackspaceChar(state);
  }
  if (event.isComposing) {
    return processComposition(state, event);
  }
  // TODO case4: delete last word
  return processStandard(state, event);
}

// export function updated(state: SessionState, event: KeyboardEvent): SessionState {
//   if (isSequenceExtension(state)) {
//     if (isBackspace(event)) return processedBackspaceSeq(state);
//     if (isStarter(event, usInternationalStarters)) return processedStarterSeq(state, event, usInternationalStarters);
//     return processedExtensionSeq(state, event, usInternationalSequences);
//   }
//   if (isBackspace(event)) return processedBackspace(state, event);
//   if (isStarter(event, usInternationalStarters)) return processedStarter(state, event, usInternationalStarters);
//   return processedStandard(state, event);
// }

export function started(state: SessionState): SessionState {
  return { ...state, start: new Date(), end: new Date(), status: 'inProgress' };
}

export function reset(state: SessionState): SessionState {
  return { ...initialState, sessionChars: resetSessionChars(state.sessionChars) };
}

export function closed(state: SessionState): SessionState {
  return { ...state, end: new Date(), status: 'closed' };
}
