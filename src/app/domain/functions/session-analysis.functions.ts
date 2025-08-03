import { SessionState } from '../../state/states/session.state';
import { DailyAverage } from '../types/data.types';
import { SessionAccuracyData, SessionRecord, SessionWpmData } from '../types/session.types';
import { exists } from './common.functions';
import { isCorrect } from './session-common.functions';

export function computeWpmSnapshot(sessionState: SessionState): number {
  const words: number = Math.round((sessionState.keystrokes - computeMismatches(sessionState)) / 5);
  const minutes: number =
    exists(sessionState.start) && exists(sessionState.end) ?
      (sessionState.end!.getTime() - sessionState.start!.getTime()) / (60 * 1000)
    : 0;

  return minutes > 0 ? words / minutes : NaN;
}

export function computeAccuracySnapshot(sessionState: SessionState): number {
  return sessionState.keystrokes > 0 ? 100 - (sessionState.errors * 100) / sessionState.keystrokes : NaN;
}

export function computeMismatches(sessionState: SessionState): number {
  return sessionState.sessionChars.filter((sessionChar) => sessionChar.input && !isCorrect(sessionChar)).length;
}

export function computeWpm(session: SessionWpmData): number {
  const words: number = Math.round(session.keystrokes / 5);
  const minutes: number = session.time / (60 * 1000);

  return minutes > 0 ? words / minutes : NaN;
}

export function computeAccuracy(session: SessionAccuracyData): number {
  return session.keystrokes > 0 ? 100 - (session.errors * 100) / session.keystrokes : NaN;
}

export function computeAccuracyDailyAverages(sessions: ReadonlyArray<SessionRecord>): DailyAverage[] {
  const dailySessions = buildDailySessions(sessions);

  return dailySessions.map((r) => ({
    day: r[0].createDate,
    average: r.reduce((acc, s) => acc + computeAccuracy(s), 0) / r.length
  }));
}

export function computeWpmDailyAverages(sessions: ReadonlyArray<SessionRecord>): DailyAverage[] {
  const dailyRecords = buildDailySessions(sessions);

  return dailyRecords.map((r) => ({
    day: r[0].createDate,
    average: r.reduce((acc, s) => acc + computeWpm(s), 0) / r.length
  }));
}

function buildDailySessions(sessions: ReadonlyArray<SessionRecord>): SessionRecord[][] {
  const allDailySessions: SessionRecord[][] = [];
  let i = 0;
  while (i < sessions.length) {
    const dailySessions: SessionRecord[] = [];
    const day = sessions[i].createDate.getDay();
    while (i < sessions.length && sessions[i].createDate.getDay() === day) {
      dailySessions.push(sessions[i]);
      ++i;
    }
    allDailySessions.push(dailySessions);
  }

  return allDailySessions;
}
