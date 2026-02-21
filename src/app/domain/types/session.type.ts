import { SessionMode } from '../constants/session-mode.const';
import { SessionOption } from '../constants/session-option.const';

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionLang = 'en' | 'fr';

export type SessionChar = {
  target: string;
  input: string | null;
  enabled: boolean;
  isComposing: boolean;
};

export type SessionCharsIndex = {
  sessionChars: ReadonlyArray<SessionChar>;
  index: number;
};

export type SessionData = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
};

export type SessionMetaData = {
  label: string | null;
  mode: SessionMode;
  option: SessionOption;
  lang: SessionLang;
};

export type SessionWpmData = {
  keystrokes: number;
  time: number;
};

export type SessionAccuracyData = {
  keystrokes: number;
  errors: number;
};

export type Session = SessionData & SessionMetaData;

export type SessionRecord = Session & { createDate: Date };
