import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';
import { Session, SessionData, SessionRecord } from '../../domain/types/session.types';

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
    mode: SessionMode.Wiki,
    label: 'coffee',
    option: SessionOption.Search,
    lang: 'en'
  };
}

export function generateSessionRecord(date?: Date): SessionRecord {
  return {
    ...generateSession(),
    createDate: date ?? new Date()
  };
}
