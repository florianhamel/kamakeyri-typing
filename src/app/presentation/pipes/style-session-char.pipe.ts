import { Pipe, PipeTransform, Signal } from '@angular/core';
import { SessionChar } from '../../domain/types/session.types';
import { Store } from '@ngrx/store';
import { selectIndex, selectIsComposing, selectSessionChars } from '../../state/selectors/session.selectors';
import { isCorrect } from '../../domain/functions/session-common.functions';

@Pipe({
  standalone: true,
  name: 'style',
  pure: false
})
export class StyleSessionCharPipe implements PipeTransform {
  sessionChars: Signal<ReadonlyArray<SessionChar>> = this.store.selectSignal(selectSessionChars);
  sessionIndex: Signal<number> = this.store.selectSignal(selectIndex);
  isComposing: Signal<boolean> = this.store.selectSignal(selectIsComposing);

  constructor(private store: Store) {}

  transform(sessionChar: SessionChar, index: number): any {
    const red: string = '200, 100, 100';
    const green: string = `rgb(75, 180, 50)`;
    const underline = { borderBottom: '1px solid black' };
    if (!sessionChar.enabled) {
      return { backgroundColor: 'grey', color: 'lightgrey' };
    }
    if (this.isPrevious(index, this.sessionIndex()) && this.isComposing()) {
      return { backgroundColor: 'orange' };
    }
    if (this.isCurrent(index, this.sessionIndex())) {
      return underline;
    }
    if (this.hasBeenTyped(index, this.sessionIndex()) && isCorrect(sessionChar)) {
      return { color: green };
    }
    if (this.hasBeenTyped(index, this.sessionIndex()) && !isCorrect(sessionChar)) {
      return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
    }
  }

  private hasBeenTyped(index: number, currIndex: number): boolean {
    return index < currIndex;
  }

  private isCurrent(index: number, currIndex: number): boolean {
    return index === currIndex;
  }

  private isPrevious(index: number, currIndex: number): boolean {
    do {
      --currIndex;
    } while (currIndex > 0 && !this.sessionChars()[currIndex].enabled);
    return index === currIndex;
  }
}
