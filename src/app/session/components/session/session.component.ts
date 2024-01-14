import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, Signal, SimpleChanges, effect } from '@angular/core';
import { SessionMetaData, SessionStatus } from '../../models/session.types';
import { SessionTextComponent } from '../session-text/session-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectStatus } from '../../store/session.selectors';
import { sessionActions } from '../../store/session.actions';

export type SessionType = 'wiki' | 'training';

@Component({
  selector: 'app-session',
  standalone: true,
  templateUrl: './session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgTemplateOutlet, SessionTextComponent, TranslateModule]
})
export class SessionComponent implements OnChanges {
  @Input() content!: string;
  @Input() metaData!: SessionMetaData;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);

  constructor(private readonly store: Store) {
    effect(() => {
      if (this.$status() === 'closed') this.store.dispatch(sessionActions.upload(this.metaData));
    }, { allowSignalWrites: true });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('metaData', this.metaData);
  }
}
