import { SessionChar } from './types';

export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  isLoading: boolean;
}>;

export type SessionState = Readonly<{
  start: Date | null;
  end: Date | null;
  sessionChars: ReadonlyArray<SessionChar>;
  index: number;
  keystrokes: number;
  errors: number;
}>;
