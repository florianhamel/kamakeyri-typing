import { Session, SessionData } from '../../domain/types/session.types';
import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';

export function generateSessionData(): SessionData {
  return {
    time: Math.floor(Math.random() * 100 + 100),
    length: Math.floor(Math.random() * 100 + 100),
    keystrokes: Math.floor(Math.random() * 100 + 100),
    errors: Math.floor(Math.random() * 100 + 100)
  };
}

export function generateSessionDto(): Session {
  return {
    ...generateSessionData(),
    mode: SessionMode.Wiki,
    label: 'coffee',
    option: SessionOption.Search
  };
}
