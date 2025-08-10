import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { setLocalItem } from '../../../application/helpers/storage.helper';
import { wikiConstant } from '../../../domain/constants/wiki.constants';
import { SessionMode } from '../../../domain/enums/session-mode.enum';
import { SessionOption } from '../../../domain/enums/session-option.enum';
import { isNull } from '../../../domain/functions/common.functions';
import { SessionMetaData, SessionStatus } from '../../../domain/types/session.types';
import { Language } from '../../../domain/types/user.types';
import { WikiLang } from '../../../domain/types/wiki.types';
import { wikiActions } from '../../../state/actions/wiki.actions';
import { selectWikiRelatedToggle } from '../../../state/selectors/feature-toggle.selectors';
import { selectStatus } from '../../../state/selectors/session.selectors';
import {
  selectExtract,
  selectIsLoading,
  selectOption,
  selectTitle,
  selectWikiLang
} from '../../../state/selectors/wiki.selectors';
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { SessionComponent } from '../session/text-session/session.component';
import { MenuComponent, MenuItem } from '../shared/menu/menu.component';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';

@Component({
  standalone: true,
  selector: 'kw-wiki-typing',
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LoadingSvgComponent,
    TranslateModule,
    FormsModule,
    SessionDataComponent,
    MenuComponent,
    SessionComponent
  ]
})
export class WikiTypingComponent implements AfterViewInit {
  @ViewChild('wikiInput') wikiInput: ElementRef | undefined;

  protected readonly input: WritableSignal<string>;
  protected readonly sessionStatus: Signal<SessionStatus>;
  protected readonly wikiTitle: Signal<string | null>;
  protected readonly wikiExtract: Signal<string | null>;
  protected readonly wikiLang: Signal<WikiLang>;
  protected readonly wikiIsLoading: Signal<boolean>;
  protected readonly wikiMetaData: Signal<SessionMetaData | null>;
  protected readonly isWikiRelatedEnabled: Signal<boolean>;
  protected readonly textLanguages: MenuItem<Language>[];

  constructor(private readonly store: Store) {
    this.input = signal<string>('');
    this.sessionStatus = this.store.selectSignal(selectStatus);
    this.wikiTitle = this.store.selectSignal(selectTitle);
    this.wikiExtract = this.store.selectSignal(selectExtract);
    this.wikiLang = this.store.selectSignal(selectWikiLang);
    this.wikiIsLoading = this.store.selectSignal(selectIsLoading);
    this.wikiMetaData = computed(() => this.buildWikiMetadata());
    this.isWikiRelatedEnabled = this.store.selectSignal(selectWikiRelatedToggle);
    this.textLanguages = [
      { langKey: 'wiki.languages.fr', value: 'fr' },
      { langKey: 'wiki.languages.en', value: 'en' }
    ];
  }

  ngAfterViewInit(): void {
    this.wikiInput?.nativeElement.focus();
  }

  protected handlePostSession(event: KeyboardEvent): void {
    if (this.sessionStatus() !== 'inProgress') {
      if (event.key === wikiConstant.randomKey) this.handleRandom();
      if (this.isWikiRelatedEnabled() && event.key === wikiConstant.relatedKey) this.handleRelated();
    }
  }

  protected handleInput(): void {
    this.store.dispatch(wikiActions.loadSearchSummary({ label: this.input() }));
  }

  protected handleRelated(): void {
    this.store.dispatch(wikiActions.loadRelatedSummary({ label: this.wikiTitle() ?? this.input() }));
  }

  protected handleRandom(): void {
    this.store.dispatch(wikiActions.loadRandomSummary());
  }

  protected updateWikiLang(wikiLang: WikiLang) {
    setLocalItem('wikiState', { wikiLang });
    this.store.dispatch(wikiActions.updateWikiLang({ wikiLang }));
  }

  private buildWikiMetadata(): SessionMetaData | null {
    const wikiOption: Signal<SessionOption | null> = this.store.selectSignal(selectOption);

    return !isNull(wikiOption()) ?
        {
          mode: SessionMode.Wiki,
          label: this.wikiTitle(),
          option: wikiOption()!,
          lang: this.wikiLang()
        }
      : null;
  }
}
