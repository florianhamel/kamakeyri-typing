import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  signal,
  Signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { selectExtract, selectIsLoading, selectOption, selectTitle } from '../../../state/selectors/wiki.selectors';
import { SessionMetaData, SessionStatus } from '../../../domain/types/session.types';
import { selectStatus } from '../../../state/selectors/session.selectors';
import { wikiConstant } from '../../../domain/constants/wiki.constants';
import { wikiActions } from '../../../state/actions/wiki.actions';
import { isNull } from '../../../domain/functions/common.functions';
import { SessionOption } from '../../../domain/enums/session-option.enum';
import { SessionMode } from '../../../domain/enums/session-mode.enum';
import { SessionComponent } from '../session/text-session/session.component';
import { SessionDataComponent } from '../session/session-data/session-data.component';
import { MenuComponent, MenuItem } from '../shared/menu/menu.component';
import { Language } from '../../../domain/types/user.types';

@Component({
  standalone: true,
  selector: 'app-wiki-typing',
  templateUrl: './wiki-typing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LoadingSvgComponent,
    TranslateModule,
    FormsModule,
    SessionComponent,
    SessionDataComponent,
    MenuComponent
  ]
})
export class WikiTypingComponent implements AfterViewInit {
  @ViewChild('wikiInput') wikiInput: ElementRef | undefined;

  protected input!: WritableSignal<string>;
  protected sessionStatus!: Signal<SessionStatus>;
  protected wikiTitle!: Signal<string | null>;
  protected wikiExtract!: Signal<string | null>;
  protected wikiIsLoading!: Signal<boolean>;
  protected wikiMetaData!: Signal<SessionMetaData | null>;
  protected textLanguages: MenuItem<Language>[] = [
    { langKey: 'wiki.languages.fr', value: 'fr' },
    { langKey: 'wiki.languages.en', value: 'en' }
  ];

  protected readonly wikiPlaceholder: string = 'wiki.placeholder';
  protected readonly isRelatedEnabled: boolean = false;

  constructor(private readonly store: Store) {
    this.input = signal<string>('');
    this.sessionStatus = this.store.selectSignal(selectStatus);
    this.wikiTitle = this.store.selectSignal(selectTitle);
    this.wikiExtract = this.store.selectSignal(selectExtract);
    this.wikiIsLoading = this.store.selectSignal(selectIsLoading);
    this.wikiMetaData = computed(() => {
      const wikiOption: Signal<SessionOption | null> = this.store.selectSignal(selectOption);

      return !isNull(wikiOption()) ?
          {
            mode: SessionMode.Wiki,
            label: this.wikiTitle(),
            option: wikiOption()!
          }
        : null;
    });
  }

  ngAfterViewInit(): void {
    this.wikiInput?.nativeElement.focus();
  }

  handlePostSession(event: KeyboardEvent): void {
    if (this.sessionStatus() !== 'inProgress') {
      if (event.key === wikiConstant.randomKey) this.handleRandom();
      if (this.isRelatedEnabled && event.key === wikiConstant.relatedKey) this.handleRelated();
    }
  }

  handleInput(): void {
    this.store.dispatch(wikiActions.loadSearchSummary({ label: this.input() }));
  }

  handleRelated(): void {
    this.store.dispatch(wikiActions.loadRelatedSummary({ label: this.wikiTitle() ?? this.input() }));
  }

  handleRandom(): void {
    this.store.dispatch(wikiActions.loadRandomSummary());
  }
}
