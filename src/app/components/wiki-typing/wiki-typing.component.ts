import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  Signal,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { SessionComponent } from '../session/session.component';
import {
  selectExtract,
  selectIsLoading,
  selectOption,
  selectTitle
} from '../../state/selectors/wiki.selectors';
import { SessionMetaData, SessionStatus, TypingOption } from '../../domain/types/session.types';
import { selectStatus } from '../../state/selectors/session.selectors';
import { wikiConstant } from '../../domain/constants/wiki.constants';
import { wikiActions } from '../../state/actions/wiki.actions';

@Component({
  standalone: true,
  selector: 'app-wiki-typing',
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LoadingSvgComponent, TranslateModule, FormsModule, SessionComponent]
})
export class WikiTypingComponent implements AfterViewInit {
  @ViewChild('wikiInput') wikiInput: ElementRef | undefined;

  $wikiTitle: Signal<string | null> = this.store.selectSignal(selectTitle);
  $wikiExtract: Signal<string | null> = this.store.selectSignal(selectExtract);
  $wikiOption: Signal<TypingOption | null> = this.store.selectSignal(selectOption);
  $wikiIsLoading: Signal<boolean> = this.store.selectSignal(selectIsLoading);

  $sessionStatus: Signal<SessionStatus> = this.store.selectSignal(selectStatus);

  $wikiMetaData: Signal<SessionMetaData> = computed(() => {
    return {
      mode: 'WIKI',
      label: this.$wikiTitle(),
      option: this.$wikiOption()
    };
  });

  input: string = '';

  readonly wikiPlaceholder: string = 'wiki.placeholder';

  constructor(private readonly store: Store) {}

  ngAfterViewInit(): void {
    this.wikiInput?.nativeElement.focus();
  }

  handlePostSession(event: KeyboardEvent): void {
    if (this.$sessionStatus() !== 'inProgress') {
      if (event.key === wikiConstant.randomKey) this.handleRandom();
      if (event.key === wikiConstant.relatedKey) this.handleRelated();
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
