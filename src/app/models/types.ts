export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionChar = Readonly<{
  target: string;
  input: string | null;
  enabled: boolean;
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
