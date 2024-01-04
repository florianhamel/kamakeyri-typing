import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, Type } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { SessionState } from '../../../common/types';
import { selectSessionState } from '../../store/session.selectors';
import { exists } from '../../../common/checks/common.checks';
import { AccuracySvgComponent } from '../../svgs/accuracy-svg/accuracy-svg.component';
import { WpmSvgComponent } from '../../svgs/wpm-svg/wpm-svg.component';

@Component({
  selector: 'app-session-data',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './session-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDataComponent {
  $sessionState: Signal<SessionState> = this.sessionStore.selectSignal(selectSessionState);

  readonly dataRows: { svgComponent: Type<any>; formatter: (sessionState: SessionState) => string }[] = [
    { svgComponent: WpmSvgComponent, formatter: this.formatWpm },
    { svgComponent: AccuracySvgComponent, formatter: this.formatAccuracy }
  ];

  constructor(private readonly sessionStore: Store<SessionState>) {}

  formatStatus(): string {
    switch (this.$sessionState().status) {
      case 'inProgress':
        return 'In progress 🏎️';
      case 'closed':
        return 'Closed ✅';
      default:
        return 'Not started 🏁';
    }
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
