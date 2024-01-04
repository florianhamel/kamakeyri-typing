import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { WikiState } from '../../../common/types';
import { wikiActions } from '../../store/wiki.actions';
import { selectTitle } from '../../store/wiki.selectors';

@Component({
  selector: 'app-wiki-options',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './wiki-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiOptionsComponent {
  $title: Signal<string | null> = this.wikiStore.selectSignal(selectTitle);

  input: string = '';

  constructor(private readonly wikiStore: Store<WikiState>) {}

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
