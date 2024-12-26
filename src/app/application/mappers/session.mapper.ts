import { SessionDTO } from '../DTOs/session.dto';
import { Session, TypingMode, TypingOption } from '../../domain/types/session.types';

export function toSessionDTO(sessionInfo: Session): SessionDTO {
  return {
    time: sessionInfo.time,
    length: sessionInfo.length,
    keystrokes: sessionInfo.keystrokes,
    errors: sessionInfo.errors,
    mode: sessionInfo.mode.toUpperCase() as TypingMode,
    label: sessionInfo.label,
    option: sessionInfo.option.toUpperCase() as TypingOption
  };
}
