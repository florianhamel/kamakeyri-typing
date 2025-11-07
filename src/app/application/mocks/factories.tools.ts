import { sessionMode } from '../../domain/constants/session-mode.const';
import { sessionOption } from '../../domain/constants/session-option.const';
import { Session, SessionData, SessionRecord } from '../../domain/types/session.type';

export function generateSessionData(): SessionData {
  return {
    time: Math.floor(Math.random() * 100 + 100),
    length: Math.floor(Math.random() * 100 + 100),
    keystrokes: Math.floor(Math.random() * 100 + 100),
    errors: Math.floor(Math.random() * 100 + 100)
  };
}

export function generateSession(): Session {
  return {
    ...generateSessionData(),
    mode: sessionMode.wiki,
    label: 'coffee',
    option: sessionOption.search,
    lang: 'en'
  };
}

export function generateSessionRecord(date?: Date): SessionRecord {
  return {
    ...generateSession(),
    createDate: date ?? new Date()
  };
}
