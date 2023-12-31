import { Type } from '@angular/core';
import { LogInComponent } from '../auth/components/log-in/log-in.component';
import { MatDialogRef } from '@angular/material/dialog';

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

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionDataItem = Readonly<{
  transl: string;
  formatter: (sessionState: SessionState) => string;
  svgComponent?: Type<any>;
}>;

export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  isLoading: boolean;
}>;

export type WikiSummary = Readonly<{
  title: string;
  extract: string;
}>;

export type Starter = Readonly<{
  key: string;
  code: string;
  shiftKey: boolean;
  value: string;
}>;

export type AuthState = Readonly<{
  username: string | null;
  exp: number | null;
}>;

export type UserInfo = Readonly<{
  username: string;
  exp: number;
}>;

export type Credentials = Readonly<{
  username: string;
  password: string;
}>;
