import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WikiTypingComponent } from '../wiki-typing/wiki-typing.component';

@Component({
  standalone: true,
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  imports: [TranslateModule, WikiTypingComponent],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WikiComponent {}
