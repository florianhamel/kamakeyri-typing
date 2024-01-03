import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { WikiState } from '../../../common/types';
import { SessionDataComponent } from '../../../session/components/session-data/session-data.component';
import { SessionTextComponent } from '../../../session/components/session-text/session-text.component';
import { LoadingSvgComponent } from '../../../session/svgs/loading-svg/loading-svg.component';
import { selectExtract, selectIsLoading } from '../../store/wiki.selectors';

@Component({
  selector: 'app-wiki-typing',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    LoadingSvgComponent,
    SessionTextComponent,
    SessionDataComponent,
    TranslateModule
  ],
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WikiTypingComponent {
  isLoading$: Observable<boolean> = this.wikiStore.select(selectIsLoading);
  extract$: Observable<string | null> = this.wikiStore.select(selectExtract);

  constructor(private readonly wikiStore: Store<WikiState>) {}
}
