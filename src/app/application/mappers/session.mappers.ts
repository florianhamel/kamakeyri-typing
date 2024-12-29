import { SessionDTO } from '../DTOs/session.dto';
import { Session } from '../../domain/types/session.types';

export function toSessionDTO(sessionInfo: Session): SessionDTO {
  return {
    time: sessionInfo.time,
    length: sessionInfo.length,
    keystrokes: sessionInfo.keystrokes,
    errors: sessionInfo.errors,
    mode: sessionInfo.mode,
    label: sessionInfo.label,
    option: sessionInfo.option
  };
}
