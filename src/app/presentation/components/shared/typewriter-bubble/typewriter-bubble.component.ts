import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  input,
  output,
  signal
} from '@angular/core';

import { SessionFacade } from '../../../../domain/facades/session.facade';
import { SessionStatus } from '../../../../domain/types/session.type';

@Component({
  standalone: true,
  selector: 'kw-typewriter-bubble',
  imports: [CommonModule],
  templateUrl: './typewriter-bubble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))])
    ])
  ]
})
export class TypewriterBubbleComponent implements OnInit, OnDestroy {
  text = input.required<string>();
  speed = input<number>(50);
  isVisible = input<boolean>(true);

  closed = output<void>();

  protected displayedText: WritableSignal<string> = signal('');
  protected sessionStatus: Signal<SessionStatus>;

  private intervalId: number | null = null;
  private currentIndex = 0;

  constructor(private readonly sessionFacade: SessionFacade) {
    this.sessionStatus = this.sessionFacade.selectStatus();
  }

  ngOnInit(): void {
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.clearTypewriter();
  }

  private startTypewriter(): void {
    this.clearTypewriter();
    this.currentIndex = 0;
    this.displayedText.set('');

    this.intervalId = window.setInterval(() => {
      if (this.currentIndex < this.text().length) {
        this.displayedText.update((current) => current + this.text()[this.currentIndex]);
        this.currentIndex++;
      } else {
        this.clearTypewriter();
      }
    }, this.speed());
  }

  private clearTypewriter(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
