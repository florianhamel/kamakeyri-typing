import { Session, SessionData } from '../../domain/types/session.types';

export function generateSessionRefined(): SessionData {
  return {
    time: Math.floor(Math.random() * 100 + 100),
    length: Math.floor(Math.random() * 100 + 100),
    keystrokes: Math.floor(Math.random() * 100 + 100),
    errors: Math.floor(Math.random() * 100 + 100)
  };
}

export function generateSessionDto(): Session {
  return {
    ...generateSessionRefined(),
    mode: 'WIKI',
    label: 'coffee',
    option: 'SEARCH'
  };
}
