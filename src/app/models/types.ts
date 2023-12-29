export type TypingSession = Readonly<{
  start: Date;
  end: Date;
  inputs: ReadonlyArray<string>;
  index: number;
}>;

export type TypingData = Readonly<{
  keystrokes: number;
  errors: number;
}>;
