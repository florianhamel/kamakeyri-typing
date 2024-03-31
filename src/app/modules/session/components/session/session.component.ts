import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Input,
  OnDestroy,
  Signal
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionMetaData, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import { selectStatus } from '../../store/session.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';
import { selectIsLoggedIn } from '../../../auth/store/auth.selectors';
import { Observable, Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-session',
  standalone: true,
  templateUrl: './session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    SessionTextComponent,
    TranslateModule,
    SessionDataComponent
  ]
})
export class SessionComponent implements OnDestroy {
  @Input() content!: string;
  @Input() metaData!: SessionMetaData;

  status$: Observable<SessionStatus> = this.store.select(selectStatus);
  statusSubscription: Subscription = new Subscription();

  constructor(private readonly store: Store) {
    this.statusSubscription = this.status$.subscribe(status => {
      if (status === 'closed') this.store.dispatch(sessionActions.upload(this.metaData));
    });
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}
