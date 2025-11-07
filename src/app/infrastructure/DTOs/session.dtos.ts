import { SessionMode } from '../../domain/constants/session-mode.const';
import { SessionOption } from '../../domain/constants/session-option.const';
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
