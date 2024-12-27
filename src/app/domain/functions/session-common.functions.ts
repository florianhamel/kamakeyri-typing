import { SessionChar } from '../types/session.types';
import { SessionState } from '../../state/states/session.state';

export function isCorrect(sessionChar: SessionChar): boolean {
  return sessionChar.input === sessionChar.target;
}

export function initSessionChars(content: string, checker: (char: string) => boolean): ReadonlyArray<SessionChar> {
  return [...content].map((char) => ({
    target: char,
    input: null,
    enabled: checker(char),
    isComposing: false
  }));
}

export function resetSessionChars(sessionChars: ReadonlyArray<SessionChar>): ReadonlyArray<SessionChar> {
  return [...sessionChars].map((sessionChar) => ({
    target: sessionChar.target,
    input: null,
    enabled: sessionChar.enabled,
    isComposing: false
  }));
}

export function moveForwardFrom(sessionChars: ReadonlyArray<SessionChar>, index: number): number {
  index = index + 1;

  return skipDisabledForward(sessionChars, index);
}

export function moveBackwardFrom(sessionChars: ReadonlyArray<SessionChar>, index: number): number {
  index = 0 < index ? index - 1 : 0;

  return skipDisabledBackward(sessionChars, index);
}

function skipDisabledBackward(sessionChars: ReadonlyArray<SessionChar>, index: number): number {
  while (0 < index && !sessionChars[index].enabled) {
    --index;
  }

  return index;
}

function skipDisabledForward(sessionChars: ReadonlyArray<SessionChar>, index: number): number {
  while (index < sessionChars.length && !sessionChars[index].enabled) {
    ++index;
  }

  return index;
}

export function lastSessionChar(sessionChars: ReadonlyArray<SessionChar>): SessionChar {
  let index: number = sessionChars.length - 1;
  while (0 < index && !sessionChars[index].enabled) {
    --index;
  }

  return sessionChars[index];
}

export function currentSessionChar(state: SessionState): SessionChar | undefined {
  return sessionCharAt(state.sessionChars, state.index);
}

/**
 * @Implementation If the index < 0 the value of sessionChars.at[index] is defined
 */
export function sessionCharAt(sessionChars: ReadonlyArray<SessionChar>, index: number): SessionChar | undefined {
  return index < 0 ? undefined : sessionChars.at(index);
}
