import { AsyncPipe, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, distinctUntilChanged, take } from 'rxjs';
import { SessionState } from '../../models/store.types';
import { SessionChar, SessionStatus } from '../../models/types';
import { newLine } from '../../models/unicodes';
import { sessionActions } from '../../store/session/session.actions';
import { selectIndex, selectSessionChars, selectStart, selectStatus } from '../../store/session/session.selectors';
import { exists } from '../../utils/checks/common.checks';
import { isEscape, isFunctional } from '../../utils/checks/keyboard-event.checks';
import { isCorrect } from '../../utils/session/utils.session';

type ViewModel = {
  status: SessionStatus;
  start: Date | null;
  sessionChars: ReadonlyArray<SessionChar>;
  index: number;
};

@Component({
  selector: 'app-typing-text',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, LetDirective, NgStyle],
  templateUrl: './typing-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingTextComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() text: string | null = null;
  @ViewChild('textRef') textRef: ElementRef | undefined;

  status$: Observable<SessionStatus> = this.store.select(selectStatus);
  start$: Observable<Date | null> = this.store.select(selectStart);
  sessionChars$: Observable<ReadonlyArray<SessionChar>> = this.store.select(selectSessionChars);
  index$: Observable<number> = this.store.select(selectIndex);

  constructor(private readonly store: Store<SessionState>) {}

  // ngOnInit(): void {}

  ngOnInit(): void {
    this.status$.subscribe({
      next: (status) => {
        console.log(status);
        if (status === 'closed') {
          this.store.dispatch(sessionActions.close());
        }
      }
    });
  }

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

  formatTarget(target: string): string {
    return target === '\n' ? `${newLine}\n` : target;
  }

  handleKeyPressed(event: KeyboardEvent, vm: ViewModel): void {
    if (isFunctional(event)) return;
    if (vm.status === 'notStarted') {
      console.log('test');
      const intervalId = window.setInterval(() => this.store.dispatch(sessionActions.updateTimer()), 1000);
      this.store.dispatch(sessionActions.start({ intervalId }));
    }
    if (isEscape(event)) this.store.dispatch(sessionActions.reset());
    else this.store.dispatch(sessionActions.update({ event }));
  }

  styleChar(index: number, currIndex: number, sessionChar: SessionChar): any {
    const red: string = '200, 100, 100';
    const green: string = '#96f9c1';
    if (!sessionChar.enabled) return { backgroundColor: 'grey', color: 'lightgrey' };
    if (this.hasUnderscore(index, currIndex)) return { borderBottom: '1px solid black' };
    if (this.isGreen(index, currIndex, sessionChar)) return { color: green };
    if (this.isRed(index, currIndex, sessionChar)) return { backgroundColor: `rgb(${red}, 0.3)`, color: `rgb(${red})` };
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
