import { SessionState } from '../../models/store.types';
import { SessionChar, Starter } from '../../models/types';
import { isAscii, isUndefined } from '../checks/common.checks';
import { isBackspace } from '../checks/keyboard-event.checks';
import { isUsInternational, usInternationalSequences, usInternationalStarters } from '../layouts/us-international.layout';
import {
  currentSessionChar,
  getStarter,
  initSessionChars,
  isCorrect,
  isSequenceExtension,
  isStarter,
  moveBackward,
  moveForward,
  resetSessionChars,
  sessionCharAt
} from './utils.session';

export function initialized(content: string): SessionState {
  return {
    start: new Date(),
    end: new Date(),
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

export function reset(state: SessionState): SessionState {
  return {
    start: new Date(),
    end: new Date(),
    sessionChars: resetSessionChars(state.sessionChars),
    index: 0,
    keystrokes: 0,
    errors: 0
  };
}

/*** Sequence */
function processedBackspaceSeq(state: SessionState): SessionState {
  const updated: SessionChar = { ...currentSessionChar(state)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  return {
    ...state,
    sessionChars
  };
}

function processedStarterSeq(
  state: SessionState,
  event: KeyboardEvent,
  starters: ReadonlyArray<Starter>
): SessionState {
  const index: number = moveForward(state, 1);
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(sessionCharAt(state, index))
    ? state.sessionChars
    : state.sessionChars.with(index, { ...sessionCharAt(state, index)!, input: getStarter(event, starters)! });
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function processedExtensionSeq(
  state: SessionState,
  event: KeyboardEvent,
  sequences: ReadonlyMap<string, string>
): SessionState {
  const key: string = currentSessionChar(state)!.input + event.key;
  if (sequences.has(key)) return processedValidSeq(state, sequences.get(key)!);
  return processedInvalidSeq(state, event);
}

function processedValidSeq(state: SessionState, sequence: string): SessionState {
  const index: number = moveForward(state, 1);
  const updated: SessionChar = { ...currentSessionChar(state)!, input: sequence };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function processedInvalidSeq(state: SessionState, event: KeyboardEvent): SessionState {
  const index: number = isUndefined(sessionCharAt(state, state.index + 1))
    ? moveForward(state, 1)
    : moveForward(state, 2);
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(sessionCharAt(state, index))
    ? state.sessionChars
    : state.sessionChars.with(index, { ...sessionCharAt(state, index)!, input: event.key });
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currentSessionChar(state)!)
    ? isUndefined(sessionCharAt(state, index)) || isCorrect(sessionCharAt(state, index)!)
      ? state.errors
      : state.errors + 1
    : isUndefined(sessionCharAt(state, index)) || isCorrect(sessionCharAt(state, index)!)
      ? state.errors + 1
      : state.errors + 2;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

/*** Not sequence */
function processedBackspace(state: SessionState): SessionState {
  const index: number = moveBackward(state, 1);
  if (isUndefined(sessionCharAt(state, index))) return state;
  const prev: SessionChar = { ...sessionCharAt(state, index)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(index, prev);
  return {
    ...state,
    sessionChars,
    index
  };
}

function processedStarter(state: SessionState, event: KeyboardEvent, starters: ReadonlyArray<Starter>): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const updated: SessionChar = { ...currentSessionChar(state)!, input: getStarter(event, starters)! };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  return {
    ...state,
    sessionChars
  };
}

function processedStandard(state: SessionState, event: KeyboardEvent): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const updated: SessionChar = { ...currentSessionChar(state)!, input: event.key };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  const index: number = moveForward(state, 1);
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(updated) ? state.errors : state.errors + 1;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}
