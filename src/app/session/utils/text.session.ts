import { SessionChar, SessionState, Starter } from '../../common/types';
import { isUndefined } from '../../common/checks/common.checks';
import { currentSessionChar, getStarter, isCorrect, moveBackward, moveForward, sessionCharAt } from './utils.session';

/*** Sequence */
export function processedBackspaceSeq(state: SessionState): SessionState {
  const end: Date = new Date();
  const updated: SessionChar = { ...currentSessionChar(state)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  return {
    ...state,
    end,
    sessionChars
  };
}

export function processedStarterSeq(
  state: SessionState,
  event: KeyboardEvent,
  starters: ReadonlyArray<Starter>
): SessionState {
  const end: Date = new Date();
  const index: number = moveForward(state, 1);
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(sessionCharAt(state, index))
    ? state.sessionChars
    : state.sessionChars.with(index, { ...sessionCharAt(state, index)!, input: getStarter(event, starters)! });
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

export function processedExtensionSeq(
  state: SessionState,
  event: KeyboardEvent,
  sequences: ReadonlyMap<string, string>
): SessionState {
  const key: string = currentSessionChar(state)!.input + event.key;
  if (sequences.has(key)) return processedValidSeq(state, sequences.get(key)!);
  return processedInvalidSeq(state, event);
}

function processedValidSeq(state: SessionState, sequence: string): SessionState {
  const end: Date = new Date();
  const index: number = moveForward(state, 1);
  const updated: SessionChar = { ...currentSessionChar(state)!, input: sequence };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function processedInvalidSeq(state: SessionState, event: KeyboardEvent): SessionState {
  const end: Date = new Date();
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
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

/*** Not sequence */
export function processedBackspace(state: SessionState): SessionState {
  const end: Date = new Date();
  const index: number = moveBackward(state, 1);
  if (isUndefined(sessionCharAt(state, index))) return state;
  const prev: SessionChar = { ...sessionCharAt(state, index)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(index, prev);
  return {
    ...state,
    end,
    sessionChars,
    index
  };
}

export function processedStarter(
  state: SessionState,
  event: KeyboardEvent,
  starters: ReadonlyArray<Starter>
): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const end: Date = new Date();
  const updated: SessionChar = { ...currentSessionChar(state)!, input: getStarter(event, starters)! };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  return {
    ...state,
    end,
    sessionChars
  };
}

export function processedStandard(state: SessionState, event: KeyboardEvent): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const end: Date = new Date();
  const index: number = moveForward(state, 1);
  const updated: SessionChar = { ...currentSessionChar(state)!, input: event.key };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(updated) ? state.errors : state.errors + 1;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}
