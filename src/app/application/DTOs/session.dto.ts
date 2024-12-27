import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';

export type SessionDTO = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
  mode: SessionMode;
  label: string | null;
  option: SessionOption;
};
