import { Session, SessionRecord } from '../../domain/types/session.types';
import { SessionDtos, SessionRecordDTO } from '../DTOs/session.dtos';

export function toSessionDTO(session: Session): SessionDtos {
  return {
    time: session.time,
    length: session.length,
    keystrokes: session.keystrokes,
    errors: session.errors,
    mode: session.mode,
    label: session.label,
    option: session.option,
    lang: session.lang
  };
}

export function toSessionRecord(dto: SessionRecordDTO): SessionRecord {
  return {
    time: dto.time,
    length: dto.length,
    keystrokes: dto.keystrokes,
    errors: dto.errors,
    mode: dto.mode,
    label: dto.label,
    option: dto.option,
    lang: dto.lang,
    createDate: new Date(dto.createDate)
  };
}
