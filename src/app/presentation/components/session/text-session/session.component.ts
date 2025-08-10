import { TranslateModule } from '@ngx-translate/core';

import { CommonModule, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  InputSignal,
  Signal,
  ViewChild,
  effect,
  input
} from '@angular/core';

import { Store } from '@ngrx/store';

import { exists } from '../../../../domain/functions/common.functions';
import { isForbidden } from '../../../../domain/functions/input-event.functions';
import { isEscape, isIgnoredKey } from '../../../../domain/functions/keyboard-event.functions';
import { InputEventSanitized } from '../../../../domain/types/event.types';
import { SessionChar, SessionMetaData, SessionStatus } from '../../../../domain/types/session.types';
import { sessionActions } from '../../../../state/actions/session.actions';
import {
  selectCanClose,
  selectHasStarted,
  selectSessionChars,
  selectStatus
} from '../../../../state/selectors/session.selectors';
import { FormatSessionCharPipe } from '../../../pipes/format-session-char.pipe';
import { StyleSessionCharPipe } from '../../../pipes/style-session-char.pipe';

@Component({
  standalone: true,
  selector: 'kw-session',
  templateUrl: './session.component.html',
  imports: [CommonModule, TranslateModule, NgStyle, FormatSessionCharPipe, StyleSessionCharPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionComponent implements AfterViewInit {
  @ViewChild('hiddenTextArea') hiddenTextAreaRef: ElementRef | undefined;

  source: InputSignal<string> = input.required<string>();
  metaData: InputSignal<SessionMetaData> = input.required<SessionMetaData>();

  status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);
  hasStarted: Signal<boolean> = this.store.selectSignal(selectHasStarted);
  sessionChars: Signal<ReadonlyArray<SessionChar>> = this.store.selectSignal(selectSessionChars);
  canClose: Signal<boolean> = this.store.selectSignal(selectCanClose);

  constructor(private readonly store: Store) {
    effect(() => this.store.dispatch(sessionActions.init({ content: this.source() })));
  }

  ngAfterViewInit(): void {
    this.focusHiddenTextArea();
  }

  focusHiddenTextArea() {
    if (exists(this.source())) {
      this.hiddenTextAreaRef?.nativeElement.focus();
    }
  }

  handleInputEvent($event: InputEvent) {
    const sanitizedEvent: InputEventSanitized = this.sanitizeInputEvent($event);
    if (isForbidden(sanitizedEvent)) {
      $event.preventDefault();
      return;
    }
    if (!this.hasStarted()) {
      this.store.dispatch(sessionActions.start());
    }
    this.store.dispatch(sessionActions.update({ event: sanitizedEvent }));
    if (this.canClose()) {
      this.store.dispatch(sessionActions.uploadOrSave(this.metaData()));
    }
  }

  handleKeyboardEvent($event: KeyboardEvent) {
    if (this.status() === 'closed' || isIgnoredKey($event)) {
      $event.preventDefault();
    } else {
      if (isEscape($event)) {
        this.store.dispatch(sessionActions.reset());
        if (this.hiddenTextAreaRef) {
          this.hiddenTextAreaRef!.nativeElement.value = '';
        }
      }
    }
  }

  private sanitizeInputEvent($event: InputEvent): InputEventSanitized {
    if ($event.data === '. ') {
      $event.preventDefault();
      if (this.hiddenTextAreaRef) {
        this.hiddenTextAreaRef.nativeElement.value += ' ';
      }
    }

    return $event as InputEventSanitized;
  }
}
