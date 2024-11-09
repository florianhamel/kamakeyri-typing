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
import { isCorrect, lastSessionChar } from '../../functions/session-common';
import { SessionChar, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import {
  selectIndex,
  selectIsComposing,
  selectSessionChars,
  selectStart,
  selectStatus
} from '../../store/session.selectors';
import { exists, isNull } from '../../../../common/checks/common.check';
import { newLine } from '../../../../common/unicodes';
import { isEscape, isFunctional, isRepeat } from '../../../../common/checks/keyboard-event.check';
import { FormsModule } from '@angular/forms';
import { InputEventSanitized } from '../../../../common/types';

@Component({
  selector: 'app-session-text',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, TranslateModule, LetDirective, NgStyle, FormsModule],
  templateUrl: './session-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTextComponent implements OnChanges, AfterViewInit {
  @Input() text!: string;

  @ViewChild('textAreaRef') textAreaRef: ElementRef | undefined;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);
  $start: Signal<Date | null> = this.store.selectSignal(selectStart);
  $index: Signal<number> = this.store.selectSignal(selectIndex);
  $sessionChars: Signal<ReadonlyArray<SessionChar>> = this.store.selectSignal(selectSessionChars);
  $isComposing: Signal<boolean> = this.store.selectSignal(selectIsComposing);

  constructor(private readonly store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('text') && exists(this.text)) {
      this.store.dispatch(sessionActions.init({ content: this.text! }));
    }
  }

  ngAfterViewInit(): void {
    this.focusTextArea();
  }

  focusTextArea() {
    if (exists(this.text)) {
      this.textAreaRef?.nativeElement.focus();
    }
  }

  handleInputEvent(event: InputEvent) {
    const sanitizedEvent: InputEventSanitized = this.sanitizeInputEvent(event);
    console.log('sanitizedEvent', sanitizedEvent);
    if (this.isNotStarted(this.$start())) {
      this.store.dispatch(sessionActions.start());
    }
    this.store.dispatch(sessionActions.update({ event: sanitizedEvent }));
    if (this.isSessionClosed()) {
      this.store.dispatch(sessionActions.close());
    }
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    // console.log('KeyboardEvent:', event);
    if (this.isIgnored(event, this.$status())) {
      event.preventDefault();
      return;
    }
    if (isEscape(event)) {
      this.store.dispatch(sessionActions.reset());
      if (this.textAreaRef) {
        this.textAreaRef!.nativeElement.value = '';
      }
      return;
    }
  }

  getFormattedTarget(target: string): string {
    return target === '\n' ? `${newLine}\n` : target;
  }

  getStyleForChar(index: number, currIndex: number, sessionChar: SessionChar): any {
    const red: string = '200, 100, 100';
    const green: string = '#50C878';
    if (this.isDisabled(sessionChar)) {
      return { backgroundColor: 'grey', color: 'lightgrey' };
    }
    if (this.isPrevious(index, currIndex) && this.$isComposing()) {
      return { backgroundColor: 'orange' };
    }
    if (this.isCurrent(index, currIndex)) {
      return { borderBottom: '1px solid black' };
    }
    if (this.isCorrect(index, currIndex, sessionChar)) {
      return { color: green };
    }
    if (this.isIncorrect(index, currIndex, sessionChar)) {
      return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
    }
  }

  private sanitizeInputEvent(event: InputEvent): InputEventSanitized {
    if (event.data === '. ') {
      event.preventDefault();
      if (this.textAreaRef) {
        this.textAreaRef.nativeElement.value += ' ';
      }
    }
    return event as InputEventSanitized;
  }

  private isSessionClosed(): boolean {
    return (
      this.$sessionChars().length <= this.$index() &&
      isCorrect(lastSessionChar(this.$sessionChars()))
    );
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

  private isPrevious(index: number, currIndex: number): boolean {
    return index === currIndex - 1;
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
