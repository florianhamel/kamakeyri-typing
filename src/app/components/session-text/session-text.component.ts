import { CommonModule, NgStyle } from '@angular/common';
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
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import {
  InputEventSanitized,
  SessionChar,
  SessionMetaData,
  SessionStatus
} from '../../domain/types/session.types';
import {
  selectIndex, selectIsComposing,
  selectSessionChars,
  selectStart,
  selectStatus
} from '../../state/selectors/session.selectors';
import { exists, isNull } from '../../domain/functions/common.functions';
import { sessionActions } from '../../state/actions/session.actions';
import { isEscape, isFunctional, isRepeat } from '../../domain/functions/keyboard-event.functions';
import { newLine } from '../../domain/constants/unicode.constants';
import { isCorrect, lastSessionChar } from '../../domain/functions/session-common.functions';
import { isForbidden } from '../../domain/functions/input-event.functions';
import { SessionDataComponent } from '../session-data/session-data.component';

@Component({
  standalone: true,
  selector: 'app-session-text',
  imports: [CommonModule, TranslateModule, NgStyle, SessionDataComponent],
  templateUrl: './session-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTextComponent implements OnChanges, AfterViewInit {
  @Input() text!: string;
  @Input() metaData!: SessionMetaData;

  @ViewChild('textAreaRef') textAreaRef: ElementRef | undefined;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);
  $start: Signal<Date | null> = this.store.selectSignal(selectStart);
  $sessionIndex: Signal<number> = this.store.selectSignal(selectIndex);
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
    if (isForbidden(sanitizedEvent)) {
      event.preventDefault();
      return;
    }
    if (this.isNotStarted(this.$start())) {
      this.store.dispatch(sessionActions.start());
    }
    this.store.dispatch(sessionActions.update({ event: sanitizedEvent }));
    if (this.shouldSessionBeClosed()) {
      this.store.dispatch(sessionActions.uploadOrSave(this.metaData));
    }
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.$status() === 'closed' || this.isIgnoredKey(event)) {
      event.preventDefault();
    } else {
      if (isEscape(event)) {
        this.store.dispatch(sessionActions.reset());
        if (this.textAreaRef) {
          this.textAreaRef!.nativeElement.value = '';
        }
      }
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

  private shouldSessionBeClosed(): boolean {
    return this.$sessionChars().length <= this.$sessionIndex() && isCorrect(lastSessionChar(this.$sessionChars()));
  }

  private isIgnoredKey(event: KeyboardEvent): boolean {
    return isFunctional(event) || isRepeat(event);
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
