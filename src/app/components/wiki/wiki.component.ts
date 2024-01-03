import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionState, WikiState } from '../../models/types';
import { wikiActions } from '../../store/wiki/wiki.actions';
import { selectExtract, selectIsLoading, selectTitle } from '../../store/wiki/wiki.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { selectStatus } from '../../store/session/session.selectors';

@Component({
  selector: 'app-wiki',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    AsyncPipe,
    LoadingSvgComponent,
    SessionTextComponent,
    LetDirective,
    SessionDataComponent
  ],
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent {
  title$ = this.wikiStore.select(selectTitle);
  extract$ = this.wikiStore.select(selectExtract);
  isLoading$ = this.wikiStore.select(selectIsLoading);

  status$ = this.sessionStore.select(selectStatus);

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
}
