import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { isCorrect, lastSessionChar } from '../../functions/common.session';
import { SessionChar, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import { selectIndex, selectSessionChars, selectStart, selectStatus } from '../../store/session.selectors';
import { exists, isNull } from '../../../../common/checks/common.checks';
import { newLine } from '../../../../common/unicodes';
import { isEscape, isFunctional, isRepeat } from '../../../../common/checks/keyboard-event.checks';

@Component({
  selector: 'app-session-text',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, TranslateModule, LetDirective, NgStyle],
  templateUrl: './session-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTextComponent implements OnChanges, AfterViewInit {
  @Input() text!: string;

  @ViewChild('textRef') textRef: ElementRef | undefined;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);
  $start: Signal<Date | null> = this.store.selectSignal(selectStart);
  $index_: Signal<number> = this.store.selectSignal(selectIndex);
  $sessionChars: Signal<ReadonlyArray<SessionChar>> = this.store.selectSignal(selectSessionChars);

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
    if (this.isIgnored(event, this.$status())) return;
    if (isEscape(event)) {
      this.store.dispatch(sessionActions.reset());
      return;
    }
    if (this.isNotStarted(this.$start())) this.store.dispatch(sessionActions.start());
    this.store.dispatch(sessionActions.update({ event }));
    if (this.isSessionClosed()) this.store.dispatch(sessionActions.close());
  }

  formatTarget(target: string): string {
    return target === '\n' ? `${newLine}\n` : target;
  }

  styleChar(index: number, currIndex: number, sessionChar: SessionChar): any {
    const red: string = '200, 100, 100';
    const green: string = '#96f9c1';
    if (this.isDisabled(sessionChar)) return { backgroundColor: 'grey', color: 'lightgrey' };
    if (this.hasUnderscore(index, currIndex)) return { borderBottom: '1px solid black' };
    if (this.isGreen(index, currIndex, sessionChar)) return { color: green };
    if (this.isRed(index, currIndex, sessionChar)) return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
  }

  private isSessionClosed(): boolean {
    return this.$sessionChars().length <= this.$index_() && isCorrect(lastSessionChar(this.$sessionChars()));
  }

  private isIgnored(event: KeyboardEvent, status: SessionStatus): boolean {
    return status === 'closed' || isFunctional(event) || isRepeat(event);
  }

  private isNotStarted(start: Date | null): boolean {
    return isNull(start);
  }

  private isDisabled(sessionChar: SessionChar): boolean {
    return !sessionChar.enabled;
  }

  private hasUnderscore(index: number, currIndex: number): boolean {
    return index === currIndex;
  }

  private isGreen(index: number, currIndex: number, sessionChar: SessionChar): boolean {
    return index < currIndex && isCorrect(sessionChar);
  }

  private isRed(index: number, currIndex: number, sessionChar: SessionChar): boolean {
    return index < currIndex && !isCorrect(sessionChar);
  }
}
