export type WikiState = Readonly<{
  extract: string | null;
  isLoading: boolean;
}>;

export type TypingState = Readonly<{
  start: Date | null;
  end: Date | null;
  index: number;
  charWraps: ReadonlyArray<CharWrap>;
  keystrokes: number;
  errors: number;
}>;

export type CharWrap = {
  source: string;
  input: string | null;
  sequence: string | null;
}
