import { ChangeDetectionStrategy, Component, computed, effect, OnInit, Signal } from '@angular/core';
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
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { selectStatus } from '../../../state/selectors/session.selectors';
import { wikiConstant } from '../../../domain/constants/wiki.constants';
import { isTruthy } from '../../../domain/functions/common.functions';

@Component({
  standalone: true,
  selector: 'app-common-words',
  imports: [TranslateModule, SessionComponent, LoadingSvgComponent, SessionDataComponent],
  templateUrl: './common-words.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonWordsComponent implements OnInit {
  protected isLoading: Signal<boolean>;

  protected someCommonWords: string;
  protected metaData: SessionMetaData;

  private readonly limit: number = 80;

  constructor(private store: Store) {
    effect(() => console.log(this.isLoading()));
  }

  ngOnInit(): void {
    this.store.dispatch(wordsActions.loadCommonWords());

    this.isLoading = this.store.selectSignal(selectIsLoading);

    this.someCommonWords = this.generateSomeCommonWords();
    this.metaData = { mode: SessionMode.CommonWords, label: null, option: SessionOption.WordLimit };
  }

  protected handlePostSession($event: KeyboardEvent) {
    if (this.store.selectSignal(selectStatus)() !== 'inProgress') {
      if ($event.key === wikiConstant.randomKey) {
        this.someCommonWords = this.generateSomeCommonWords();
      }
    }
  }

  private generateSomeCommonWords(): string {
    const commonWords: ReadonlyArray<string> = this.store.selectSignal(selectCommonWords)();

    return generateRandomWords(commonWords, this.limit).join(' ');
  }

  protected readonly isTruthy = isTruthy;
}
