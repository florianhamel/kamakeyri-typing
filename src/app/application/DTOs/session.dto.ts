import { TypingMode, TypingOption } from '../../domain/types/session.types';

export type SessionDTO = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
  mode: TypingMode;
  label: string | null;
  option: TypingOption;
};
