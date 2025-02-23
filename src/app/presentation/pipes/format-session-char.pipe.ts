import { Pipe, PipeTransform } from '@angular/core';
import { newLine } from '../../domain/constants/unicode.constants';
import { SessionChar } from '../../domain/types/session.types';

@Pipe({
  standalone: true,
  name: 'format',
  pure: true
})
export class FormatSessionCharPipe implements PipeTransform {
  transform(sessionChar: SessionChar): string {
    return sessionChar.target === '\n' ? `${newLine}\n` : sessionChar.target;
  }
}
