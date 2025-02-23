import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  InputSignal,
  Signal,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { sessionActions } from '../../../../state/actions/session.actions';
import { SessionChar } from '../../../../domain/types/session.types';
import { selectSessionChars } from '../../../../state/selectors/session.selectors';

// TODO delete this, session.component is the go to for every sessions
@Component({
  standalone: true,
  selector: 'app-words-session',
  imports: [],
  templateUrl: './words-session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsSessionComponent {
  @ViewChild('hiddenTextArea') hiddenTextAreaRef: ElementRef | undefined;

  words: InputSignal<ReadonlyArray<string>> = input.required<ReadonlyArray<string>>();

  sessionChars: Signal<ReadonlyArray<SessionChar>> = this.store.selectSignal(selectSessionChars);
  sessionWords: Signal<ReadonlyArray<ReadonlyArray<SessionChar>>> = computed(() => this.buildSessionWords());

  constructor(private store: Store) {
    effect(() => {
      console.warn('word-session.component effect triggered');
      // TODO move that logic up in the parent ><
      const randomWords: string[] = Array.from({ length: 500 }, () => this.generateRandomWord(this.words()));
      this.store.dispatch(sessionActions.init({ content: randomWords.join(' ') }));
    });
  }

  focusHiddenTextArea() {
    this.hiddenTextAreaRef?.nativeElement.focus();
  }

  handleInputEvent($event: InputEvent): void {}

  handleKeyboardEvent($event: KeyboardEvent): void {
    if ($event.key === ' ') {
      this.hiddenTextAreaRef!.nativeElement.value = '';
    }
  }

  generateRandomWord(words: ReadonlyArray<string>): string {
    return this.words()[Math.floor(Math.random() * this.words().length)];
  }

  private buildSessionWords(): ReadonlyArray<ReadonlyArray<SessionChar>> {
    const sessionWords: SessionChar[][] = [];
    let [end, start] = [0, 0];
    while (end < this.sessionChars().length) {
      if (this.sessionChars()[end].target === ' ') {
        sessionWords.push(this.sessionChars().slice(start, end));
        start = end + 1;
      }
      ++end;
    }
    sessionWords.push(this.sessionChars().slice(start, end));

    return sessionWords;
  }
}
