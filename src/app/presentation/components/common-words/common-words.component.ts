import { ChangeDetectionStrategy, Component, computed, OnInit, Signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { wordsActions } from '../../../state/actions/words.actions';
import { selectCommonWords, selectIsLoading } from '../../../state/selectors/words.selectors';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { SessionComponent } from '../session/text-session/session.component';
import { SessionMetaData } from '../../../domain/types/session.types';
import { SessionMode } from '../../../domain/enums/session-mode.enum';
import { SessionOption } from '../../../domain/enums/session-option.enum';
import { generateRandomWords } from '../../../domain/functions/words.functions';

@Component({
  standalone: true,
  selector: 'app-common-words',
  imports: [TranslateModule, SessionComponent, LoadingSvgComponent],
  templateUrl: './common-words.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonWordsComponent implements OnInit {
  protected isLoading: Signal<boolean>;
  protected someCommonWords: Signal<string>;

  protected metaData: SessionMetaData;

  private limit: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.time();
    this.store.dispatch(wordsActions.loadCommonWords());

    this.isLoading = this.store.selectSignal(selectIsLoading);
    this.someCommonWords = computed(() => {
      const commonWords: ReadonlyArray<string> = this.store.selectSignal(selectCommonWords)();
      return generateRandomWords(commonWords, this.limit).join(' ');
    });
    this.metaData = { mode: SessionMode.CommonWords, label: null, option: SessionOption.WordLimit };
    this.limit = 50;
  }
}
