import { SessionDTO } from '../DTOs/session.dto';
import { Session } from '../../domain/types/session.types';

export function toSessionDTO(session: Session): SessionDTO {
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
