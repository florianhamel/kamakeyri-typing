import { Type } from '@angular/core';

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionState = Readonly<{
  start: Date | null;
  end: Date | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
}>;

export type SessionChar = Readonly<{
  target: string;
  input: string | null;
  enabled: boolean;
}>;

export type SessionDataItem = Readonly<{
  transl: string;
  formatter: (sessionState: SessionState) => string;
  svgComponent?: Type<any>;
}>;

export type SessionType = 'wiki';

export type SessionRefined = Readonly<{
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
}>

export type SessionDto = Readonly<SessionRefined & {
  type: SessionType;
  label?: string;
  mode?: string
}>;
