import { SessionChar, SessionState, Starter } from '../../models/types';
import { isUndefined } from '../../utils/common.checks';
import { isBackspace, isStandard } from '../../utils/keyboard-event.checks';
import { usInternationalSequences, usInternationalStarters } from '../../utils/layouts/us-international.layout';
import {
  currSessionChar,
  getStarter,
  isCorrect,
  isSequenceExtension,
  isStarter,
  nextSessionChar,
  prevSessionChar
} from './session.utils';

export function processedEvent(state: SessionState, event: KeyboardEvent): SessionState {
  if (isSequenceExtension(state)) {
    if (isBackspace(event)) return processedBackspaceSeq(state);
    if (isStarter(event, usInternationalStarters)) return processedStarterSeq(state, event, usInternationalStarters);
    return processedExtensionSeq(state, event, usInternationalSequences);
  }
  if (isBackspace(event)) return processedBackspace(state);
  if (isStarter(event, usInternationalStarters)) return processedStarter(state, event, usInternationalStarters);
  if (isStandard(event)) return processedStandard(state, event);
  return state;
}

/*** Sequence */
function processedBackspaceSeq(state: SessionState): SessionState {
  const curr: SessionChar = { ...currSessionChar(state)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, curr);
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
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(nextSessionChar(state))
    ? state.sessionChars
    : state.sessionChars.with(state.index + 1, { ...nextSessionChar(state)!, input: getStarter(event, starters)! });
  const index: number = state.index + 1;
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(currSessionChar(state)!) ? state.errors : state.errors + 1;
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
  const key: string = currSessionChar(state)!.input + event.key;
  if (sequences.has(key)) return processedValidSeq(state, sequences.get(key)!);
  return processedInvalidSeq(state, event);
}

function processedValidSeq(state: SessionState, sequence: string): SessionState {
  const curr: SessionChar = { ...currSessionChar(state)!, input: sequence };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, curr);
  const index: number = state.index + 1;
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(curr) ? state.errors : state.errors + 1;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function processedInvalidSeq(state: SessionState, event: KeyboardEvent): SessionState {
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(nextSessionChar(state))
    ? state.sessionChars
    : state.sessionChars.with(state.index + 1, { ...nextSessionChar(state)!, input: event.key });
  const index: number = isUndefined(nextSessionChar(state)) ? state.index + 1 : state.index + 2;
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currSessionChar(state)!)
    ? isUndefined(nextSessionChar(state)) || isCorrect(nextSessionChar(state)!)
      ? state.errors
      : state.errors + 1
    : isUndefined(nextSessionChar(state)) || isCorrect(nextSessionChar(state)!)
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
  if (isUndefined(prevSessionChar(state))) return state;
  const prev: SessionChar = { ...prevSessionChar(state)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index - 1, prev);
  const index: number = state.index - 1;
  return {
    ...state,
    sessionChars,
    index
  };
}

function processedStarter(state: SessionState, event: KeyboardEvent, starters: ReadonlyArray<Starter>): SessionState {
  if (isUndefined(currSessionChar(state))) return state;
  const curr: SessionChar = { ...currSessionChar(state)!, input: getStarter(event, starters)! };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, curr);
  return {
    ...state,
    sessionChars
  };
}

function processedStandard(state: SessionState, event: KeyboardEvent): SessionState {
  if (isUndefined(currSessionChar(state))) return state;
  const curr: SessionChar = { ...currSessionChar(state)!, input: event.key };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, curr);
  const index: number = state.index + 1;
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(curr) ? state.errors : state.errors + 1;
  return {
    ...state,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}
