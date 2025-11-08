import { TranslateModule } from '@ngx-translate/core';

import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { kwRoute } from '../../../domain/constants/route.const';
import { sessionMode } from '../../../domain/constants/session-mode.const';
import { sessionOption } from '../../../domain/constants/session-option.const';
import { SessionFacade } from '../../../domain/facades/session.facade';
import { SessionMetaData, SessionStatus } from '../../../domain/types/session.type';
import { NavItem } from '../header/header.component';
import { SessionComponent } from '../session/text-session/session.component';
import { TypewriterBubbleComponent } from "../shared/typewriter-bubble/typewriter-bubble.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [TranslateModule, SessionComponent, RouterLink, TypewriterBubbleComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  protected readonly sessionStatus: Signal<SessionStatus>;
  protected readonly startTypingText = '👋 You can start typing!';

  protected readonly exploreItems: NavItem[] = [
    { langKey: 'kamakeyri.exploreWiki', route: kwRoute.wiki },
    { langKey: 'kamakeyri.exploreWords', route: kwRoute.words }
  ];

  protected readonly metaData: SessionMetaData = {
    mode: sessionMode.custom,
    label: 'welcome',
    option: sessionOption.none,
    lang: 'en'
  };

  constructor(private readonly sessionFacade: SessionFacade) {
    this.sessionStatus = this.sessionFacade.selectStatus();
  }
}
