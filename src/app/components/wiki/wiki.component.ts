import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { WikiState } from '../../models/types';
import { wikiActions } from '../../store/wiki/wiki.actions';
import { selectExtract, selectIsLoading, selectTitle } from '../../store/wiki/wiki.selectors';
import { SessionDataComponent } from '../session-data/session-data.component';
import { SessionTextComponent } from '../session-text/session-text.component';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    AsyncPipe,
    LoadingSvgComponent,
    SessionTextComponent,
    LetDirective,
    SessionDataComponent
  ],
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent {
  title$ = this.store.select(selectTitle);
  extract$ = this.store.select(selectExtract);
  isLoading$ = this.store.select(selectIsLoading);

  input: string = '';

  constructor(private readonly store: Store<WikiState>) {}

  handleWikiInput(): void {
    this.store.dispatch(wikiActions.loadExtract({ title: this.input }));
  }

  handleRandom(): void {
    this.store.dispatch(wikiActions.loadRandomExtract());
  }
}
