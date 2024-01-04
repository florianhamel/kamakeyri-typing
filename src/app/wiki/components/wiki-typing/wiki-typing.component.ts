import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { WikiState } from '../../../common/types';
import { SessionDataComponent } from '../../../session/components/session-data/session-data.component';
import { SessionTextComponent } from '../../../session/components/session-text/session-text.component';
import { LoadingSvgComponent } from '../../../session/svgs/loading-svg/loading-svg.component';
import { selectWikiState } from '../../store/wiki.selectors';
import { wikiActions } from '../../store/wiki.actions';
import { FormsModule } from '@angular/forms';

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

  input: string = '';

  constructor(private readonly wikiStore: Store<WikiState>) {}

  handlePostSession(event: string): void {
    if (event === 'ArrowLeft') this.handleRandom();
    if (event === 'ArrowRight') this.handleRelated(this.$wikiState().title);
  }

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
