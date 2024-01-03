import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionState } from 'http2';
import { Observable } from 'rxjs';
import { SessionStatus, WikiState } from '../../../common/types';
import { selectStatus } from '../../../session/store/session.selectors';
import { wikiActions } from '../../store/wiki.actions';
import { selectTitle } from '../../store/wiki.selectors';

@Component({
  selector: 'app-wiki-options',
  standalone: true,
  imports: [CommonModule, LetDirective, TranslateModule, FormsModule],
  templateUrl: './wiki-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiOptionsComponent {
  title$: Observable<string | null> = this.wikiStore.select(selectTitle);
  sessionStatus$: Observable<SessionStatus> = this.sessionStore.select(selectStatus);
  input: string = '';

  constructor(
    private readonly wikiStore: Store<WikiState>,
    private readonly sessionStore: Store<SessionState>
  ) {}

  handleWikiInput(): void {
    this.wikiStore.dispatch(wikiActions.loadExtract({ title: this.input }));
  }

  handleRelated(title: string | null): void {
    this.wikiStore.dispatch(wikiActions.loadRelatedExtract({ title: title ?? this.input }));
  }

  handleRandom(): void {
    this.wikiStore.dispatch(wikiActions.loadRandomExtract());
  }

  handlePostSession(event: string, title: string | null): void {
    if (event === 'ArrowLeft') this.wikiStore.dispatch(wikiActions.loadRandomExtract());
    if (event === 'ArrowRight') this.wikiStore.dispatch(wikiActions.loadRelatedExtract({ title: title ?? this.input }));
  }
}
