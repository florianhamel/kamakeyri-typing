import { ChangeDetectionStrategy, Component, computed, OnInit, Signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { wordsActions } from '../../../state/actions/words.actions';
import { selectIsLoading, selectRandomWords } from '../../../state/selectors/words.selectors';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { SessionComponent } from '../session/text-session/session.component';
import { SessionMetaData } from '../../../domain/types/session.types';
import { SessionMode } from '../../../domain/enums/session-mode.enum';
import { SessionOption } from '../../../domain/enums/session-option.enum';
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { selectStatus } from '../../../state/selectors/session.selectors';
import { wikiConstant } from '../../../domain/constants/wiki.constants';
import { defaultLimit } from '../../../domain/constants/words.constants';

@Component({
  standalone: true,
  selector: 'app-common-words',
  imports: [TranslateModule, SessionComponent, LoadingSvgComponent, SessionDataComponent],
  templateUrl: './common-words.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonWordsComponent implements OnInit {
  protected isLoading: Signal<boolean>;
  protected words: Signal<string>;

  protected metaData: SessionMetaData;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(wordsActions.loadCommonWords());

    this.isLoading = this.store.selectSignal(selectIsLoading);
    this.words = computed(() => this.store.selectSignal(selectRandomWords)().join(' '));

    this.metaData = { mode: SessionMode.CommonWords, label: `${defaultLimit}_words`, option: SessionOption.WordLimit };
  }

  protected handlePostSession($event: KeyboardEvent) {
    if (this.store.selectSignal(selectStatus)() !== 'inProgress') {
      if ($event.key === wikiConstant.randomKey) {
        this.store.dispatch(wordsActions.generateRandomWords({ limit: defaultLimit }));
      }
    }
  }
}
