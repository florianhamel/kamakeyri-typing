import { SessionState } from '../state/states/session.state';
import { SessionChar } from '../../domain/types/session.type';

export function isCorrect(sessionChar: SessionChar): boolean {
  return sessionChar.input === sessionChar.target;
}

export function resetSessionChars(sessionChars: ReadonlyArray<SessionChar>): ReadonlyArray<SessionChar> {
  return [...sessionChars].map((sessionChar) => ({
    target: sessionChar.target,
    input: null,
    enabled: sessionChar.enabled,
    isComposing: false
  }));
}

export function moveForwardFrom(index: number, sessionChars: ReadonlyArray<SessionChar>): number {
  index = index + 1;

  return skipDisabledForward(index, sessionChars);
}

export function moveBackwardFrom(index: number, sessionChars: ReadonlyArray<SessionChar>): number {
  index = 0 < index ? index - 1 : 0;

  return skipDisabledBackward(index, sessionChars);
}

export function lastSessionChar(sessionChars: ReadonlyArray<SessionChar>): SessionChar {
  let index: number = sessionChars.length - 1;
  while (0 < index && !sessionChars[index].enabled) {
    --index;
  }

  return sessionChars[index];
}

export function currentSessionChar(state: SessionState): SessionChar | undefined {
  return sessionCharAt(state.index, state.sessionChars);
}

/**
 * @Implementation If the index < 0 the value of sessionChars.at[index] is defined
 */
export function sessionCharAt(index: number, sessionChars: ReadonlyArray<SessionChar>): SessionChar | undefined {
  return index < 0 ? undefined : sessionChars.at(index);
}

function skipDisabledBackward(index: number, sessionChars: ReadonlyArray<SessionChar>): number {
  while (0 < index && !sessionChars[index].enabled) {
    --index;
  }

  return index;
}

function skipDisabledForward(index: number, sessionChars: ReadonlyArray<SessionChar>): number {
  while (index < sessionChars.length && !sessionChars[index].enabled) {
    ++index;
  }

  return index;
}