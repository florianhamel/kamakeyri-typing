import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, Input, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionMetaData, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import { selectStatus } from '../../store/session.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';
import { selectIsLoggedIn } from '../../../auth/store/auth.selectors';

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

  protected readonly SessionTextComponent = SessionTextComponent;

  $status: Signal<SessionStatus> = this.store.selectSignal(selectStatus);
  $isLoggedIn: Signal<boolean> = this.store.selectSignal(selectIsLoggedIn);

  // TODO fix: a bonus session is uploaded because when a user logs in it triggers the effect
  constructor(private readonly store: Store) {
    effect(
      () => {
        if (this.$status() === 'closed') {
          if (this.$isLoggedIn()) {
            this.store.dispatch(sessionActions.upload(this.metaData));
          } else {
            this.store.dispatch(sessionActions.save(this.metaData));
          }
        }
      },
      { allowSignalWrites: true }
    );
  }
}
