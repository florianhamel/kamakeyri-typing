import { SessionChar, SessionState, Starter } from '../../models/types';
import { exists } from '../../utils/common.checks';

export function isCorrect(sessionChar: SessionChar): boolean {
  return sessionChar.input === sessionChar.target;
}

export function isSequenceExtension(state: SessionState): boolean {
  return exists(currSessionChar(state)?.input);
}

export function isStarter(event: KeyboardEvent, starters: ReadonlyArray<Starter>): boolean {
  return starters.some((starter) => eventMatchesStarter(event, starter));
}

export function getStarter(event: KeyboardEvent, starters: ReadonlyArray<Starter>): string | undefined {
  return starters.find((starter) => eventMatchesStarter(event, starter))?.value;
}

export function initCharWraps(content: string): ReadonlyArray<SessionChar> {
  return [...content].map((char) => ({ target: char, input: null }));
}

export function currSessionChar(state: SessionState): SessionChar | undefined {
  return state.sessionChars.at(state.index);
}

export function prevSessionChar(state: SessionState): SessionChar | undefined {
  return 0 < state.index ? state.sessionChars.at(state.index - 1) : undefined;
}

export function nextSessionChar(state: SessionState): SessionChar | undefined {
  return state.sessionChars.at(state.index + 1);
}

/*** Local */
function eventMatchesStarter(event: KeyboardEvent, starter: Starter): boolean {
  return event.key === starter.key && event.code === starter.code && event.shiftKey === starter.shiftKey;
}
