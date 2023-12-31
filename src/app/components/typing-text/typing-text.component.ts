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
import { SessionChar, SessionState } from '../../models/types';
import { sessionActions } from '../../store/session/session.actions';
import { selectSessionState } from '../../store/session/session.selectors';
import { isCorrect } from '../../store/session/session.utils';
import { exists } from '../../utils/common.checks';

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
      this.store.dispatch(sessionActions.startSession({ content: this.text! }));
    }
  }

  ngAfterViewInit(): void {
    if (exists(this.text)) {
      this.textRef?.nativeElement.focus();
    }
  }

  handleKeyPressed(event: KeyboardEvent): void {
    this.store.dispatch(sessionActions.handleKeyPressed({ event }));
  }

  getStyle(currIndex: number, index: number, charWrap: SessionChar): any {
    if (this.isCurrent(currIndex, index)) return { borderBottom: '1px solid black' };
    if (this.isCorrect(currIndex, index, charWrap)) return { color: '#c196f9' };
    if (this.isIncorrect(currIndex, index, charWrap))
      return { backgroundColor: 'rgb(150, 50, 50, 0.3)', color: 'rgb(150, 50, 50)' };
  }

  private isCurrent(currIndex: number, index: number): boolean {
    return index === currIndex;
  }

  private isCorrect(currIndex: number, index: number, charWrap: SessionChar): boolean {
    return index < currIndex && isCorrect(charWrap);
  }

  private isIncorrect(currIndex: number, index: number, charWrap: SessionChar): boolean {
    return index < currIndex && !isCorrect(charWrap);
  }
}
