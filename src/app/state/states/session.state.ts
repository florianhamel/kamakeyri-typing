import { SessionChar, SessionRecord, SessionStatus } from '../../domain/types/session.types';

export type SessionState = {
  sessionRecords: ReadonlyArray<SessionRecord>;
  isLoading: boolean;
  start: Date | null;
  end: Date | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
  isComposing: boolean;
};

export const initialState: SessionState = {
  sessionRecords: [],
  isLoading: false,
  start: null,
  end: null,
  index: 0,
  sessionChars: [],
  keystrokes: 0,
  errors: 0,
  status: 'notStarted',
  isComposing: false
};
