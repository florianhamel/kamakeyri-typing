import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { wikiActions } from '../../store/wiki/wiki.actions';
import { Observable } from 'rxjs';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { selectExtract, selectIsLoading } from '../../store/wiki/wiki.selectors';
import { WikiState } from '../../models/types';
import { TypingTextComponent } from '../typing-text/typing-text.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  imports: [TranslateModule, FormsModule, AsyncPipe, LoadingSvgComponent, TypingTextComponent],
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent {
  input: string = '';
  extract$: Observable<string | null> = this.store.select(selectExtract);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private readonly store: Store<WikiState>) {}

  handleWikiInput(): void {
    this.store.dispatch(wikiActions.loadExtract({ title: this.input }));
  }
}
