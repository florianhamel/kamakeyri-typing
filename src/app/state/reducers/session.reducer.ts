import { createFeature, createReducer, on } from '@ngrx/store';
import { SessionChar } from '../../domain/types/session.types';
import { sessionActions } from '../actions/session.actions';
import { initSessionChars, resetSessionChars } from '../../domain/functions/session-common.functions';
import { isUsInternational } from '../../domain/layouts/us-international.layout';
import { isBackspace, isBackspaceWord, isComposing } from '../../domain/functions/input-event.functions';
import {
  processBackspaceChar,
  processBackspaceWord,
  processComposition,
  processStandard
} from '../../domain/functions/session.functions';
import { wikiActions } from '../actions/wiki.actions';
import { SessionState, initialState } from '../states/session.state';
import { InputEventSanitized } from '../../domain/types/event.types';

export const sessionFeature = createFeature<'session', SessionState>({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => init(content)),
    on(sessionActions.update, (state, { event }) => update(state, event)),
    on(sessionActions.start, (state) => start(state)),
    on(
      sessionActions.reset,
      wikiActions.loadSearchSummary,
      wikiActions.loadRelatedSummary,
      wikiActions.loadRandomSummary,
      (state) => reset(state)
    ),
    on(sessionActions.close, (state) => close(state))
  )
});

function init(content: string): SessionState {
  const sessionChars: ReadonlyArray<SessionChar> = initSessionChars(content, isUsInternational);
  return {
    ...initialState,
    sessionChars
  };
}

function update(state: SessionState, event: InputEventSanitized): SessionState {
  if (isBackspace(event)) {
    return processBackspaceChar(state);
  }
  if (isBackspaceWord(event)) {
    return processBackspaceWord(state);
  }
  if (isComposing(event)) {
    return processComposition(state, event);
  }
  return processStandard(state, event);
}

function start(state: SessionState): SessionState {
  return { ...state, start: new Date(), end: new Date(), status: 'inProgress' };
}

function reset(state: SessionState): SessionState {
  return { ...initialState, sessionChars: resetSessionChars(state.sessionChars) };
}

function close(state: SessionState): SessionState {
  return { ...state, end: new Date(), status: 'closed' };
}
