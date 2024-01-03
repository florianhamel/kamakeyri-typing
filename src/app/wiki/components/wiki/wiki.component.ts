import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { WikiState } from '../../../common/types';
import { wikiActions } from '../../store/wiki.actions';
import { selectTitle } from '../../store/wiki.selectors';
import { WikiOptionsComponent } from '../wiki-options/wiki-options.component';
import { WikiTypingComponent } from '../wiki-typing/wiki-typing.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  templateUrl: './wiki.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, WikiTypingComponent, WikiOptionsComponent]
})
export class WikiComponent {}
