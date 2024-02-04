import { SessionState } from '../models/session.types';
import { exists } from '../../../common/checks/common.checks';
import { isCorrect } from './common.session';

export namespace SessionUtils {
  export function wpm(sessionState: SessionState): number {
    const words: number = Math.round((sessionState.keystrokes - mismatches(sessionState)) / 5);
    const minutes: number =
      exists(sessionState.start) && exists(sessionState.end)
        ? (sessionState.end!.getTime() - sessionState.start!.getTime()) / (60 * 1000)
        : 0;
    return minutes > 0 ? words / minutes : NaN;
  }

  export function accuracy(sessionState: SessionState): number {
    return sessionState.keystrokes > 0
      ? 100 - (sessionState.errors * 100) / sessionState.keystrokes
      : NaN;
  }

  function mismatches(sessionState: SessionState): number {
    return sessionState.sessionChars.filter(
      (sessionChar) => sessionChar.input && !isCorrect(sessionChar)
    ).length;
  }
}
