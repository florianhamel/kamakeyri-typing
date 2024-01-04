import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WikiOptionsComponent } from '../wiki-options/wiki-options.component';
import { WikiTypingComponent } from '../wiki-typing/wiki-typing.component';

@Component({
  selector: 'app-wiki',
  standalone: true,
  templateUrl: './wiki.component.html',
  imports: [TranslateModule, WikiTypingComponent, WikiOptionsComponent],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WikiComponent {}
