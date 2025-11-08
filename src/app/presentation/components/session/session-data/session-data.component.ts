import { TranslatePipe } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';

import {
  computeAccuracySnapshot,
  computeWpmSnapshot
} from '../../../../application/functions/session-analysis.functions';
import { DialogFacade } from '../../../../domain/facades/dialog.facade';
import { SessionFacade } from '../../../../domain/facades/session.facade';
import { UserFacade } from '../../../../domain/facades/user.facade';
import { SessionDataItem } from '../../../../domain/types/session.type';
import { SessionState } from '../../../../state/states/session.state';

@Component({
  standalone: true,
  selector: 'kw-session-data',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './session-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDataComponent {
  sessionState: Signal<SessionState> = this.sessionFacade.selectSessionState();
  isLoggedIn: Signal<boolean> = this.userFacade.selectIsLoggedIn();

  readonly sessionDataItems: SessionDataItem[] = [
    { translation: 'typing.speed', formatter: this.formatWpm },
    { translation: 'typing.accuracy', formatter: this.formatAccuracy }
  ];

  constructor(
    private readonly sessionFacade: SessionFacade,
    private readonly userFacade: UserFacade,
    private readonly dialogFacade: DialogFacade
  ) {}

  openDialog(): void {
    this.dialogFacade.openLogIn();
  }

  private formatWpm(sessionState: SessionState): string {
    const wpm: number = computeWpmSnapshot(sessionState);
    return `${isNaN(wpm) ? '-' : wpm.toFixed(0)} wpm`;
  }

  private formatAccuracy(sessionState: SessionState): string {
    const accuracy: number = computeAccuracySnapshot(sessionState);
    return `${isNaN(accuracy) ? '-' : accuracy?.toFixed(1)} %`;
  }
}
