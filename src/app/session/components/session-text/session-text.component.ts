import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionChar, SessionState, SessionStatus } from '../../../common/types';
import { newLine } from '../../../common/unicodes';
import { sessionActions } from '../../store/session.actions';
import { selectSessionState } from '../../store/session.selectors';
import { exists, isNull } from '../../../common/checks/common.checks';
import { isEscape, isFunctional } from '../../../common/checks/keyboard-event.checks';
import { isCorrect } from '../../utils/utils';

@Component({
  selector: 'app-session-text',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, TranslateModule, LetDirective, NgStyle],
  templateUrl: './session-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTextComponent implements OnChanges, AfterViewInit {
  @Input() text!: string;
  @Input() postSessionKeys!: ReadonlyArray<string>;

  @Output() postSessionKeydown: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('textRef') textRef: ElementRef | undefined;

  $sessionState: Signal<SessionState> = this.sessionStore.selectSignal(selectSessionState);

  constructor(private readonly sessionStore: Store<SessionState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('text') && exists(this.text)) {
      this.sessionStore.dispatch(sessionActions.init({ content: this.text! }));
    }
  }

  ngAfterViewInit(): void {
    if (exists(this.text)) {
      this.textRef?.nativeElement.focus();
    }
  }

  handleKeyPressed(event: KeyboardEvent): void {
    if (this.isPostSession(event)) this.postSessionKeydown.emit(event.key);
    if (this.isIgnored(event, this.$sessionState().status)) return;
    if (isEscape(event)) {
      this.sessionStore.dispatch(sessionActions.reset());
      return;
    }
    if (this.isNotStarted(this.$sessionState().start)) this.sessionStore.dispatch(sessionActions.start());
    this.sessionStore.dispatch(sessionActions.update({ event }));
    this.sessionStore.dispatch(sessionActions.checkStatus());
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

  private isPostSession(event: KeyboardEvent): boolean {
    return this.$sessionState().status !== 'inProgress' && this.postSessionKeys?.includes(event.key);
  }

  private isIgnored(event: KeyboardEvent, status: SessionStatus): boolean {
    return status === 'closed' || isFunctional(event);
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
