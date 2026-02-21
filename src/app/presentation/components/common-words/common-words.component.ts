import { TranslateModule } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component, OnInit, Signal, computed } from '@angular/core';

import { WikiKey } from '../../../domain/constants/wiki.const';
import { defaultLimit } from '../../../domain/constants/words.const';
import { sessionMode } from '../../../domain/constants/session-mode.const';
import { sessionOption, SessionOption } from '../../../domain/constants/session-option.const';
import { SessionFacade } from '../../../application/facades/session.facade';
import { WordsFacade } from '../../../application/facades/words.facade';
import { SessionMetaData } from '../../../domain/types/session.type';
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { SessionComponent } from '../session/text-session/session.component';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';

@Component({
  standalone: true,
  selector: 'kw-common-words',
  imports: [TranslateModule, SessionComponent, SessionDataComponent, LoadingSvgComponent],
  templateUrl: './common-words.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonWordsComponent implements OnInit {
  protected isLoading: Signal<boolean>;
  protected words: Signal<string>;

  protected metaData: SessionMetaData;

  constructor(
    private readonly wordsFacade: WordsFacade,
    private readonly sessionFacade: SessionFacade
  ) {}

  ngOnInit(): void {
    this.wordsFacade.loadCommonWords();

    this.isLoading = this.wordsFacade.selectIsLoading();
    this.words = computed(() => this.wordsFacade.selectRandomWords()().join(' '));
    this.metaData = {
      mode: sessionMode.words,
      label: `${defaultLimit}_words`,
      option: sessionOption.wordLimit,
      lang: 'en'
    };
  }

  protected handlePostSession($event: KeyboardEvent) {
    if (this.sessionFacade.selectStatus()() !== 'inProgress') {
      if ($event.key === WikiKey.randomKey) {
        this.wordsFacade.generateRandomWords(defaultLimit);
      }
    }
  }
}
