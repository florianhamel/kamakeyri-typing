// Store
export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  isLoading: boolean;
}>;

export type SessionState = Readonly<{
  start: Date | null;
  end: Date | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
}>;


// Others
export type SessionChar = Readonly<{
  target: string;
  input: string | null;
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
