import { TranslatePipe } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';

import {
  computeAccuracySnapshot,
  computeWpmSnapshot
} from '../../../../core/functions/session-analysis.functions';
import { DialogFacade } from '../../../../core/facades/dialog.facade';
import { SessionFacade } from '../../../../core/facades/session.facade';
import { UserFacade } from '../../../../core/facades/user.facade';
import { SessionState } from '../../../../core/state/states/session.state';

type SessionDataItem = {
  translation: string;
  formatter: (sessionState: SessionState) => string;
};

@Component({
  standalone: true,
  selector: 'kw-session-data',
  imports: [TranslatePipe],
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
