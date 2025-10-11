import { Pipe, PipeTransform } from '@angular/core';
import { newLine } from '../../domain/constants/unicode.const';
import { SessionChar } from '../../domain/types/session.type';

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
