import { SessionState } from '../../models/store.types';
import { SessionChar, Starter } from '../../models/types';
import { exists } from '../checks/common.checks';

export function isCorrect(sessionChar: SessionChar): boolean {
  return sessionChar.input === sessionChar.target;
}

export function isSequenceExtension(state: SessionState): boolean {
  return exists(currentSessionChar(state)?.input);
}

export function isStarter(event: KeyboardEvent, starters: ReadonlyArray<Starter>): boolean {
  return starters.some((starter) => eventMatchesStarter(event, starter));
}

export function getStarter(event: KeyboardEvent, starters: ReadonlyArray<Starter>): string | undefined {
  return starters.find((starter) => eventMatchesStarter(event, starter))?.value;
}

function eventMatchesStarter(event: KeyboardEvent, starter: Starter): boolean {
  return event.key === starter.key && event.code === starter.code && event.shiftKey === starter.shiftKey;
}

export function initSessionChars(content: string, checker: (char: string) => boolean): ReadonlyArray<SessionChar> {
  return [...content].map((char) => ({ target: char, input: null, enabled: checker(char) }));
}

export function resetSessionChars(sessionChars: ReadonlyArray<SessionChar>): ReadonlyArray<SessionChar> {
  return [...sessionChars].map((sessionChar) => ({
    target: sessionChar.target,
    input: null,
    enabled: sessionChar.enabled
  }));
}

export function moveForward(state: SessionState, min: number): number {
  let index: number = state.index + min;
  while (index < state.sessionChars.length && !state.sessionChars[index].enabled) {
    ++index;
  }
  return index;
}

export function moveBackward(state: SessionState, min: number): number {
  let index: number = 0 < state.index ? state.index - min : state.index;
  while (0 < index && !state.sessionChars[index].enabled) {
    --index;
  }
  return index;
}

export function currentSessionChar(state: SessionState): SessionChar | undefined {
  return sessionCharAt(state, state.index);
}

export function sessionCharAt(state: SessionState, index: number): SessionChar | undefined {
  return index < 0 ? undefined : state.sessionChars.at(index);
}
