import { SessionMode } from '../../domain/enums/session-mode.enum';
import { SessionOption } from '../../domain/enums/session-option.enum';
import { SessionLang } from '../../domain/types/session.type';

export type SessionDtos = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
  mode: SessionMode;
  label: string | null;
  option: SessionOption;
  lang: SessionLang;
};

export type SessionRecordDTO = SessionDtos & { createDate: string };
