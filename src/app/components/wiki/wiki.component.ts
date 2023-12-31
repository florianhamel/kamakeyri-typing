import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { WikiState } from '../../models/types';
import { wikiActions } from '../../store/wiki/wiki.actions';
import { selectWikiState } from '../../store/wiki/wiki.selectors';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { TypingTextComponent } from '../typing-text/typing-text.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  imports: [TranslateModule, FormsModule, AsyncPipe, LoadingSvgComponent, TypingTextComponent, LetDirective],
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiComponent {
  wiki$: Observable<WikiState> = this.store.select(selectWikiState);
  input: string = '';

  constructor(private readonly store: Store<WikiState>) {}

  handleWikiInput(): void {
    this.store.dispatch(wikiActions.loadExtract({ title: this.input }));
  }
}
