import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { sessionMode } from '../../../domain/constants/session-mode.const';
import { sessionOption } from '../../../domain/constants/session-option.const';
import { SessionMetaData } from '../../../domain/types/session.type';
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { SessionComponent } from '../session/text-session/session.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [TranslateModule, SessionComponent, SessionDataComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  protected readonly welcomeText =
    'Hello! Here is a text you can type to experience how fun this website is, enjoy!';

  protected readonly metaData: SessionMetaData = {
    mode: sessionMode.custom,
    label: 'welcome',
    option: sessionOption.none,
    lang: 'en'
  };
}
