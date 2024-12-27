import { Type } from '@angular/core';
import { SessionState } from '../../state/states/session.state';
import { SessionMode } from '../enums/session-mode.enum';
import { SessionOption } from '../enums/session-option.enum';

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

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

export type SessionDataItem = {
  translation: string;
  formatter: (sessionState: SessionState) => string;
  svgComponent?: Type<any>;
};

export type SessionData = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
};

export type SessionMetaData = {
  mode: SessionMode;
  label: string | null;
  option: SessionOption;
};

export type Session = SessionData & SessionMetaData;
