import { Type } from '@angular/core';
import { WikiOption } from '../../wiki/models/wiki.types';

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

export type SessionRefined = Readonly<{
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
}>;

export type SessionMetaData =
  | Readonly<{
      mode: 'wiki';
      label: string | null;
      option: WikiOption | null;
    }>
  | Readonly<{
      mode: 'training';
      label: string;
      option: 'TrainingOption';
    }>;

export type SessionDto = Readonly<SessionRefined & SessionMetaData>;
