import { SessionState } from '../../state/states/session.state';
import { Session, SessionRecord } from '../types/session.types';
import { exists } from './common.functions';
import { isCorrect } from './session-common.functions';

export function computeWpm(sessionState: SessionState): number {
  const words: number = Math.round((sessionState.keystrokes - computeMismatches(sessionState)) / 5);
  const minutes: number =
    exists(sessionState.start) && exists(sessionState.end) ?
      (sessionState.end!.getTime() - sessionState.start!.getTime()) / (60 * 1000)
    : 0;

  return minutes > 0 ? words / minutes : NaN;
}

export function wpm(session: Session): number {
  const words: number = Math.round((session.keystrokes - session.errors) / 5);
  const minutes: number = session.time / (60 * 1000);

  return minutes > 0 ? words / minutes : NaN;
}

export function computeAccuracy(sessionState: SessionState): number {
  return sessionState.keystrokes > 0 ? 100 - (sessionState.errors * 100) / sessionState.keystrokes : NaN;
}

export function accuracy(session: { keystrokes: number; errors: number }): number {
  return session.keystrokes > 0 ? 100 - (session.errors * 100) / session.keystrokes : NaN;
}

export function computeMismatches(sessionState: SessionState): number {
  return sessionState.sessionChars.filter((sessionChar) => sessionChar.input && !isCorrect(sessionChar)).length;
}

export function computeAccuracyAveragesPerDay(sessions: ReadonlyArray<SessionRecord>): {
  average: number;
  date: Date;
}[] {
  const recordsPerDay = buildRecordsPerDay(sessions);

  return recordsPerDay.map((r) => ({
    average: r.reduce((acc, s) => acc + accuracy(s), 0) / r.length,
    date: r[0].createDate
  }));
}

export function computeWpmAveragesPerDay(sessions: ReadonlyArray<SessionRecord>): {
  average: number;
  date: Date;
}[] {
  const recordsPerDay = buildRecordsPerDay(sessions);

  return recordsPerDay.map((r) => ({
    average: r.reduce((acc, s) => acc + wpm(s), 0) / r.length,
    date: r[0].createDate
  }));
}

function buildRecordsPerDay(records: ReadonlyArray<SessionRecord>): SessionRecord[][] {
  const recordsPerDay: SessionRecord[][] = [];
  let i = 0;
  while (i < records.length) {
    const recordsOfTheDay: SessionRecord[] = [];
    const day = records[i].createDate.getDay();
    while (i < records.length && records[i].createDate.getDay() === day) {
      recordsOfTheDay.push(records[i]);
      ++i;
    }
    recordsPerDay.push(recordsOfTheDay);
  }

  return recordsPerDay;
}
