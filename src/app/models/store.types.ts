import { SessionChar, SessionStatus } from './types';

export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  isLoading: boolean;
}>;

export type SessionState = Readonly<{
  start: Date | null;
  end: Date | null;
  intervalId: number | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
}>;
