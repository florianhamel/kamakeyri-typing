import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  effect
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { wikiConst } from '../../../common/constants';
import { SessionDataComponent } from '../../../session/components/session-data/session-data.component';
import { SessionTextComponent } from '../../../session/components/session-text/session-text.component';
import { SessionState } from '../../../session/models/session.types';
import { selectSessionState } from '../../../session/store/session.selectors';
import { LoadingSvgComponent } from '../../../session/svgs/loading-svg/loading-svg.component';
import { WikiState } from '../../models/wiki.types';
import { wikiActions } from '../../store/wiki.actions';
import { selectWikiState } from '../../store/wiki.selectors';

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
export class WikiTypingComponent implements AfterViewInit {
  @ViewChild('wikiInput') wikiInput: ElementRef | undefined;

  $wikiState: Signal<WikiState> = this.wikiStore.selectSignal(selectWikiState);
  $sessionState: Signal<SessionState> = this.sessionStore.selectSignal(selectSessionState);

  input: string = '';

  constructor(
    private readonly wikiStore: Store<WikiState>,
    private readonly sessionStore: Store<SessionState>
  ) {
    effect(() => {
      if (this.$sessionState().status === 'closed') {
        console.log('closed');
      }
    });
  }

  ngAfterViewInit(): void {
    this.wikiInput?.nativeElement.focus();
  }

  handlePostSession(event: KeyboardEvent): void {
    if (this.$sessionState().status !== 'inProgress') {
      if (event.key === wikiConst.randomKey) this.handleRandom();
      if (event.key === wikiConst.relatedKey) this.handleRelated();
    }
  }

  handleInput(): void {
    this.wikiStore.dispatch(wikiActions.loadSearchSummary({ title: this.input }));
  }

  handleRelated(): void {
    this.wikiStore.dispatch(wikiActions.loadRelatedSummary({ title: this.$wikiState().title ?? this.input }));
  }

  handleRandom(): void {
    this.wikiStore.dispatch(wikiActions.loadRandomSummary());
  }
}
