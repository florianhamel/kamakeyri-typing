import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionState, WikiState } from '../common/types';
import { sessionActions } from '../session/store/session.actions';

@Component({
  selector: 'app-tmp-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tmp-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TmpTestComponent {
  constructor(
    private readonly wikiStore: Store<WikiState>,
    private readonly sessionStore: Store<SessionState>
  ) {}

  handleClick(): void {
    // this.wikiStore.dispatch(wikiActions.loadExtract({ title: 'short' }));
    this.wikiStore.dispatch(sessionActions.init({ content: 'coucou' }));
  }
}
