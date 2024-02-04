import { Type } from '@angular/core';
import { WikiOption } from '../../wiki/models/wiki.types';

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionState = {
  start: Date | null;
  end: Date | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
};

export type SessionChar = {
  target: string;
  input: string | null;
  enabled: boolean;
};

export type SessionDataItem = {
  transl: string;
  formatter: (sessionState: SessionState) => string;
  svgComponent?: Type<any>;
};

export type SessionRefined = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
};

export type SessionMetaData =
  | {
      mode: 'wiki';
      label: string | null;
      option: WikiOption | null;
    }
  | {
      mode: 'training';
      label: string;
      option: 'TrainingOption';
    };

export type SessionDto = SessionRefined & SessionMetaData;
