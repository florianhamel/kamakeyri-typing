import { SessionDto, SessionRefined } from '../modules/session/models/session.types';

export function generateSessionRefined(): SessionRefined {
  return {
    time: Math.floor(Math.random() * 100 + 100),
    length: Math.floor(Math.random() * 100 + 100),
    keystrokes: Math.floor(Math.random() * 100 + 100),
    errors: Math.floor(Math.random() * 100 + 100)
  };
}

export function generateSessionDto(): SessionDto {
  return {
    ...generateSessionRefined(),
    mode: 'wiki',
    label: 'coffee',
    option: 'search'
  };
}
