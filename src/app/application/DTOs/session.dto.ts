import { TypingMode, TypingOption } from '../../domain/types/session.types';

export type SessionDto = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
  mode: TypingMode;
  label: string | null;
  option: TypingOption;
};
