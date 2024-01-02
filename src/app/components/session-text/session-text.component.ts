import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
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
import { SessionChar, SessionState, SessionStatus } from '../../models/types';
import { newLine } from '../../models/unicodes';
import { sessionActions } from '../../store/session/session.actions';
import { selectIndex, selectSessionChars, selectStart, selectStatus } from '../../store/session/session.selectors';
import { exists, isNull } from '../../utils/checks/common.checks';
import { isEscape, isFunctional } from '../../utils/checks/keyboard-event.checks';
import { isCorrect } from '../../utils/session/utils.session';

type ViewModel = {
  start: Date | null;
  sessionChars: ReadonlyArray<SessionChar>;
  index: number;
  status: SessionStatus;
};

@Component({
  selector: 'app-typing-text',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, TranslateModule, LetDirective, NgStyle],
  templateUrl: './session-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTextComponent implements OnChanges, AfterViewInit {
  @Input() text: string | null = null;
  @ViewChild('textRef') textRef: ElementRef | undefined;

  start$: Observable<Date | null> = this.store.select(selectStart);
  sessionChars$: Observable<ReadonlyArray<SessionChar>> = this.store.select(selectSessionChars);
  index$: Observable<number> = this.store.select(selectIndex);
  status$: Observable<SessionStatus> = this.store.select(selectStatus);

  constructor(private readonly store: Store<SessionState>) {}

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

  handleKeyPressed(event: KeyboardEvent, vm: ViewModel): void {
    if (this.isIgnored(event, vm)) return;
    if (isNull(vm.start)) {
      const intervalId = window.setInterval(() => this.store.dispatch(sessionActions.updateTimer()), 1000);
      this.store.dispatch(sessionActions.start({ intervalId }));
    }
    if (isEscape(event)) this.store.dispatch(sessionActions.reset());
    else {
      this.store.dispatch(sessionActions.update({ event }));
      this.store.dispatch(sessionActions.checkStatus());
    }
  }

  formatTarget(target: string): string {
    return target === '\n' ? `${newLine}\n` : target;
  }

  styleChar(index: number, currIndex: number, sessionChar: SessionChar): any {
    const red: string = '200, 100, 100';
    const green: string = '#96f9c1';
    if (!sessionChar.enabled) return { backgroundColor: 'grey', color: 'lightgrey' };
    if (this.hasUnderscore(index, currIndex)) return { borderBottom: '1px solid black' };
    if (this.isGreen(index, currIndex, sessionChar)) return { color: green };
    if (this.isRed(index, currIndex, sessionChar)) return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
  }

  private isIgnored(event: KeyboardEvent, vm: ViewModel): boolean {
    return vm.status === 'closed' || isFunctional(event);
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
