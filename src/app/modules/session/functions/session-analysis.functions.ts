import { SessionState } from '../models/session.types';
import { isCorrect } from './session-common.functions';
import { exists } from '../../../common/functions/common.functions';

export function computeWpm(sessionState: SessionState): number {
  const words: number = Math.round((sessionState.keystrokes - computeMismatches(sessionState)) / 5);
  const minutes: number =
    exists(sessionState.start) && exists(sessionState.end) ?
      (sessionState.end!.getTime() - sessionState.start!.getTime()) / (60 * 1000)
    : 0;
  return minutes > 0 ? words / minutes : NaN;
}

export function computeAccuracy(sessionState: SessionState): number {
  return sessionState.keystrokes > 0
    ? 100 - (sessionState.errors * 100) / sessionState.keystrokes
    : NaN;
}

export function computeMismatches(sessionState: SessionState): number {
  return sessionState.sessionChars.filter(
    (sessionChar) => sessionChar.input && !isCorrect(sessionChar)
  ).length;
}
