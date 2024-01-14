import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionMetaData, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import { selectStatus } from '../../store/session.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';

export type SessionType = 'wiki' | 'training';

@Component({
  selector: 'app-session',
  standalone: true,
  templateUrl: './session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgTemplateOutlet, SessionTextComponent, TranslateModule, SessionDataComponent]
})
export class SessionComponent {
  @Input() content!: string;
  @Input() metaData!: SessionMetaData;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);

  constructor(private readonly store: Store) {
    effect(
      () => {
        if (this.$status() === 'closed') this.store.dispatch(sessionActions.upload(this.metaData));
      },
      { allowSignalWrites: true }
    );
  }

  handleClick(): void {
    this.store.dispatch(sessionActions.upload(this.metaData));
  }
}
