import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { wordsActions } from '../../state/actions/words.actions';
import { selectCommonWords } from '../../state/selectors/words.selectors';

@Component({
  standalone: true,
  selector: 'app-words-typing',
  imports: [TranslateModule],
  templateUrl: './words-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsTypingComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(wordsActions.loadCommonWords());
  }

  play() {
    console.log(this.store.selectSignal(selectCommonWords)());
  }
}
