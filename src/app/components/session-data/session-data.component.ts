import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionDataItem, SessionState } from '../../domain/types/session.types';
import { selectSessionState } from '../../state/selectors/session.selectors';
import { selectIsLoggedIn } from '../../state/selectors/auth.selectors';
import { LogInComponent } from '../log-in/log-in.component';
import { computeAccuracy, computeWpm } from '../../domain/functions/session-analysis.functions';

@Component({
  standalone: true,
  selector: 'app-session-data',
  imports: [CommonModule, TranslateModule],
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
    const wpm: number = computeWpm(sessionState);
    return `${isNaN(wpm) ? '-' : wpm.toFixed(0)} wpm`;
  }

  private formatAccuracy(sessionState: SessionState): string {
    const accuracy: number = computeAccuracy(sessionState);
    return `${isNaN(accuracy) ? '-' : accuracy?.toFixed(1)} %`;
  }
}