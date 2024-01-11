import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LogInComponent } from '../../../auth/components/log-in/log-in.component';
import { selectIsLoggedIn } from '../../../auth/store/auth.selectors';
import { exists } from '../../../common/checks/common.checks';
import { selectSessionState } from '../../store/session.selectors';
import { SessionDataItem, SessionState } from '../../models/session.types';

@Component({
  selector: 'app-session-data',
  standalone: true,
  imports: [CommonModule, LetDirective, TranslateModule],
  templateUrl: './session-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDataComponent {
  $sessionState: Signal<SessionState> = this.store.selectSignal(selectSessionState);
  $isLoggedIn: Signal<boolean> = this.store.selectSignal(selectIsLoggedIn);

  logInRef?: MatDialogRef<LogInComponent>;

  readonly sessionData: SessionDataItem[] = [
    { transl: 'typing.speed', formatter: this.formatWpm },
    { transl: 'typing.accuracy', formatter: this.formatAccuracy }
  ];

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openDialog(): void {
    this.logInRef = this.dialog.open(LogInComponent);
  }

  private formatWpm(sessionState: SessionState): string {
    const minutes: number =
      exists(sessionState.start) && exists(sessionState.end)
        ? (sessionState.end!.getTime() - sessionState.start!.getTime()) / (60 * 1000)
        : 0;
    const words: number = Math.round(sessionState.keystrokes / 5);
    const wpm: number | undefined = minutes > 0 ? words / minutes : undefined;
    return `${wpm?.toFixed(0) ?? '-'} wpm`;
  }

  private formatAccuracy(sessionState: SessionState): string {
    const accuracy: number | undefined =
      sessionState.keystrokes > 0 ? 100 - (sessionState.errors * 100) / sessionState.keystrokes : undefined;
    return `${accuracy?.toFixed(1) ?? '- '}%`;
  }
}
