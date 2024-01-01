import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { SessionState } from '../../models/store.types';
import { selectEnd, selectErrors, selectKeystrokes, selectStart } from '../../store/session/session.selectors';
import { exists } from '../../utils/checks/common.checks';
import { AccuracySvgComponent } from '../svgs/accuracy-svg/accuracy-svg.component';
import { WpmSvgComponent } from '../svgs/wpm-svg/wpm-svg.component';

type ViewModel = {
  start: Date | null;
  end: Date | null;
  keystrokes: number;
  errors: number;
};

@Component({
  selector: 'app-typing-data',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './typing-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingDataComponent implements OnInit {
  start$ = this.store.select(selectStart);
  end$ = this.store.select(selectEnd);
  keystrokes$ = this.store.select(selectKeystrokes);
  errors$ = this.store.select(selectErrors);

  readonly dataRows: { svgComponent: Type<any>; formatter: (vm: ViewModel) => string }[] = [
    { svgComponent: WpmSvgComponent, formatter: this.formatWpm },
    { svgComponent: AccuracySvgComponent, formatter: this.formatAccuracy }
  ];

  constructor(private readonly store: Store<SessionState>) {}

  ngOnInit(): void {
      this.errors$.subscribe({
        next: (value) => console.log(value)
      })
  }

  private formatAccuracy(vm: ViewModel): string {
    const accuracy: number = vm.keystrokes > 0 ? 100 - (vm.errors * 100) / vm.keystrokes : 100;
    return `${accuracy.toFixed(1)}%`;
  }

  private formatWpm(vm: ViewModel): string {
    const minutes: number =
      exists(vm.start) && exists(vm.end) ? (vm.end!.getTime() - vm.start!.getTime()) / (60 * 1000) : 0;
    const words: number = Math.round(vm.keystrokes / 5);
    const wpm: number = minutes > 0 ? words / minutes : 200;
    return `${wpm.toFixed(0)} wpm`;
  }
}
