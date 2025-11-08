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

import { exists } from '../../../../application/functions/common.functions';
import { isForbidden } from '../../../../application/functions/input-event.functions';
import { isEscape, isIgnoredKey } from '../../../../application/functions/keyboard-event.functions';
import { SessionFacade } from '../../../../domain/facades/session.facade';
import { InputEventSanitized } from '../../../../domain/types/event.type';
import { SessionChar, SessionMetaData, SessionStatus } from '../../../../domain/types/session.type';
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

  status: Signal<SessionStatus> = this.sessionFacade.selectStatus();
  hasStarted: Signal<boolean> = this.sessionFacade.selectHasStarted();
  sessionChars: Signal<ReadonlyArray<SessionChar>> = this.sessionFacade.selectSessionChars();
  canClose: Signal<boolean> = this.sessionFacade.selectCanClose();

  constructor(private readonly sessionFacade: SessionFacade) {
    effect(() => this.sessionFacade.init(this.source()));
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
      this.sessionFacade.start();
    }
    this.sessionFacade.update(sanitizedEvent);
    if (this.canClose()) {
      this.sessionFacade.close(this.metaData());
    }
  }

  handleKeyboardEvent($event: KeyboardEvent) {
    if (this.status() === 'closed' || isIgnoredKey($event)) {
      $event.preventDefault();
    } else {
      if (isEscape($event)) {
        this.sessionFacade.reset();
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
