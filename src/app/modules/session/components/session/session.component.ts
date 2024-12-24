import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionMetaData, SessionStatus } from '../../models/session.types';
import { sessionActions } from '../../store/session.actions';
import { selectStatus } from '../../store/session.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-session',
  templateUrl: './session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SessionTextComponent, TranslateModule, SessionDataComponent]
})
export class SessionComponent implements OnInit, OnDestroy {
  @Input() content!: string;
  @Input() metaData!: SessionMetaData;

  status$: Observable<SessionStatus> = this.store.select(selectStatus);
  statusSubscription!: Subscription;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.statusSubscription = this.status$.subscribe((status) => {
      if (status === 'closed') this.store.dispatch(sessionActions.upload(this.metaData));
    });
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}
