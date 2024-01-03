import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { SessionState, SessionStatus } from '../../../common/types';
import {
  selectEnd,
  selectErrors,
  selectKeystrokes,
  selectStart,
  selectStatus
} from '../../store/session.selectors';
import { exists } from '../../../common/checks/common.checks';
import { AccuracySvgComponent } from '../../svgs/accuracy-svg/accuracy-svg.component';
import { WpmSvgComponent } from '../../svgs/wpm-svg/wpm-svg.component';

type ViewModel = {
  start: Date | null;
  end: Date | null;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
};

@Component({
  selector: 'app-session-data',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './session-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDataComponent {
  start$ = this.store.select(selectStart);
  end$ = this.store.select(selectEnd);
  keystrokes$ = this.store.select(selectKeystrokes);
  errors$ = this.store.select(selectErrors);
  status$ = this.store.select(selectStatus);

  readonly dataRows: { svgComponent: Type<any>; formatter: (vm: ViewModel) => string }[] = [
    { svgComponent: WpmSvgComponent, formatter: this.formatWpm },
    { svgComponent: AccuracySvgComponent, formatter: this.formatAccuracy }
  ];

  constructor(private readonly store: Store<SessionState>) {}

  formatStatus(status: string | null): string {
    switch (status) {
      case 'inProgress':
        return 'In progress 🏎️';
      case 'closed':
        return 'Closed ✅';
      default:
        return 'Not started 🏁';
    }
  }

  private formatAccuracy(vm: ViewModel): string {
    const accuracy: number | undefined = vm.keystrokes > 0 ? 100 - (vm.errors * 100) / vm.keystrokes : undefined;
    return `${accuracy?.toFixed(1) ?? '- '}%`;
  }

  private formatWpm(vm: ViewModel): string {
    const minutes: number =
      exists(vm.start) && exists(vm.end) ? (vm.end!.getTime() - vm.start!.getTime()) / (60 * 1000) : 0;
    const words: number = Math.round(vm.keystrokes / 5);
    const wpm: number | undefined = minutes > 0 ? words / minutes : undefined;
    return `${wpm?.toFixed(0) ?? '-'} wpm`;
  }
}
