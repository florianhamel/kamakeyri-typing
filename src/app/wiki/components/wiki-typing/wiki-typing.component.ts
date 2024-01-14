import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  computed,
  effect
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { wikiConst } from '../../../common/constants';
import { SessionDataComponent } from '../../../session/components/session-data/session-data.component';
import { SessionTextComponent } from '../../../session/components/session-text/session-text.component';
import { SessionComponent } from '../../../session/components/session/session.component';
import { SessionMetaData, SessionStatus } from '../../../session/models/session.types';
import { selectStatus } from '../../../session/store/session.selectors';
import { LoadingSvgComponent } from '../../../session/svgs/loading-svg/loading-svg.component';
import { WikiOption } from '../../models/wiki.types';
import { wikiActions } from '../../store/wiki.actions';
import { selectExtract, selectIsLoading, selectOption, selectTitle } from '../../store/wiki.selectors';

@Component({
  selector: 'app-wiki-typing',
  standalone: true,
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LetDirective,
    LoadingSvgComponent,
    SessionTextComponent,
    SessionDataComponent,
    TranslateModule,
    FormsModule,
    SessionComponent
  ]
})
export class WikiTypingComponent implements AfterViewInit {
  @ViewChild('wikiInput') wikiInput: ElementRef | undefined;

  $wikiTitle: Signal<string | null> = this.store.selectSignal(selectTitle);
  $wikiExtract: Signal<string | null> = this.store.selectSignal(selectExtract);
  $wikiOption: Signal<WikiOption | null> = this.store.selectSignal(selectOption);
  $wikiIsLoading: Signal<boolean> = this.store.selectSignal(selectIsLoading);

  $sessionStatus: Signal<SessionStatus> = this.store.selectSignal(selectStatus);

  input: string = '';
  wikiPlaceholder: string = 'wiki.placeholder';
  $wikiMetaData: Signal<SessionMetaData> = computed(() => {
    return {
      mode: 'wiki',
      label: this.$wikiTitle(),
      option: this.$wikiOption()
    };
  });

constructor(private readonly store: Store) {
    effect(() => {
      console.log(this.$sessionStatus());
    });
  }

  ngAfterViewInit(): void {
    this.wikiInput?.nativeElement.focus();
  }

  handlePostSession(event: KeyboardEvent): void {
    if (this.$sessionStatus() !== 'inProgress') {
      if (event.key === wikiConst.randomKey) this.handleRandom();
      if (event.key === wikiConst.relatedKey) this.handleRelated();
    }
  }

  handleInput(): void {
    this.store.dispatch(wikiActions.loadSearchSummary({ title: this.input }));
  }

  handleRelated(): void {
    this.store.dispatch(wikiActions.loadRelatedSummary({ title: this.$wikiTitle() ?? this.input }));
  }

  handleRandom(): void {
    this.store.dispatch(wikiActions.loadRandomSummary());
  }
}
