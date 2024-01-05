import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SessionState, SessionStatus, WikiState } from '../../../common/types';
import { SessionDataComponent } from '../../../session/components/session-data/session-data.component';
import { SessionTextComponent } from '../../../session/components/session-text/session-text.component';
import { LoadingSvgComponent } from '../../../session/svgs/loading-svg/loading-svg.component';
import { selectWikiState } from '../../store/wiki.selectors';
import { wikiActions } from '../../store/wiki.actions';
import { FormsModule } from '@angular/forms';
import { selectStatus } from '../../../session/store/session.selectors';
import { wikiConst } from '../../../common/constants';

@Component({
  selector: 'app-wiki-typing',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    LoadingSvgComponent,
    SessionTextComponent,
    SessionDataComponent,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiTypingComponent {
  $wikiState: Signal<WikiState> = this.wikiStore.selectSignal(selectWikiState);
  $sessionStatus: Signal<SessionStatus> = this.sessionStore.selectSignal(selectStatus);

  input: string = '';

  optionTransls: ReadonlyArray<string> = ['wiki.options.random', 'wiki.options.related'];

  constructor(
    private readonly wikiStore: Store<WikiState>,
    private readonly sessionStore: Store<SessionState>
  ) {}

  handlePostSession(event: KeyboardEvent): void {
    if (this.$sessionStatus() !== 'inProgress') {
      if (event.key === wikiConst.randomKey) this.handleRandom();
      if (event.key === wikiConst.relatedKey) this.handleRelated();
    }
  }

  handleInput(): void {
    this.wikiStore.dispatch(wikiActions.loadExtract({ title: this.input }));
  }

  handleRelated(): void {
    this.wikiStore.dispatch(wikiActions.loadRelatedExtract({ title: this.$wikiState().title ?? this.input }));
  }

  handleRandom(): void {
    this.wikiStore.dispatch(wikiActions.loadRandomExtract());
  }
}
