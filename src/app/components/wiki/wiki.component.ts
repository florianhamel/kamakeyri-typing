import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { WikiState } from '../../models/store.types';
import { wikiActions } from '../../store/wiki/wiki.actions';
import { selectExtract, selectIsLoading, selectTitle } from '../../store/wiki/wiki.selectors';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { TypingDataComponent } from '../typing-data/typing-data.component';
import { TypingTextComponent } from '../typing-text/typing-text.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    AsyncPipe,
    LoadingSvgComponent,
    TypingTextComponent,
    LetDirective,
    TypingDataComponent
  ],
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent {
  vm$ = combineLatest({
    title: this.store.select(selectTitle),
    extract: this.store.select(selectExtract),
    isLoading: this.store.select(selectIsLoading)
  });

  input: string = '';

  constructor(private readonly store: Store<WikiState>) {}

  handleWikiInput(): void {
    this.store.dispatch(wikiActions.loadExtract({ title: this.input }));
  }
}
