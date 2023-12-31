import { AsyncPipe, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SessionState } from '../../models/store.types';
import { SessionChar } from '../../models/types';
import { sessionActions } from '../../store/session/session.actions';
import { selectSessionState } from '../../store/session/session.selectors';
import { exists } from '../../utils/checks/common.checks';
import { isEscape, isFunctional } from '../../utils/checks/keyboard-event.checks';
import { isCorrect } from '../../utils/session/utils.session';

@Component({
  selector: 'app-typing-text',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, LetDirective, NgStyle],
  templateUrl: './typing-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingTextComponent implements OnChanges, AfterViewInit {
  @Input() text: string | null = null;

  @ViewChild('textRef') textRef: ElementRef | undefined;

  session$: Observable<SessionState> = this.store.select(selectSessionState);

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('text') && exists(this.text)) {
      this.store.dispatch(sessionActions.init({ content: this.text! }));
    }
  }

  ngAfterViewInit(): void {
    if (exists(this.text)) {
      this.textRef?.nativeElement.focus();
    }
  }

  handleKeyPressed(event: KeyboardEvent): void {
    if (isFunctional(event)) return;
    if (isEscape(event)) this.store.dispatch(sessionActions.reset());
    else this.store.dispatch(sessionActions.update({ event }));
  }

  styleChar(index: number, currIndex: number, sessionChar: SessionChar): any {
    const red: string = '200, 100, 100';
    const green: string = '#96f9c1';
    if (!sessionChar.enabled) return { backgroundColor: 'grey', color: 'lightgrey' };
    if (this.isCurrent(index, currIndex)) return { borderBottom: '1px solid black' };
    if (this.isCorrect(index, currIndex, sessionChar)) return { color: green };
    if (this.isIncorrect(index, currIndex, sessionChar))
      return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
  }

  private isCurrent(index: number, currIndex: number): boolean {
    return index === currIndex;
  }

  private isCorrect(index: number, currIndex: number, sessionChar: SessionChar): boolean {
    return index < currIndex && isCorrect(sessionChar);
  }

  private isIncorrect(index: number, currIndex: number, sessionChar: SessionChar): boolean {
    return index < currIndex && !isCorrect(sessionChar);
  }
}
