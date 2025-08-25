import { provideTranslateService } from '@ngx-translate/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import { wordsFeature } from '../../../state/reducers/words.reducer';
import { wordsInitialState } from '../../../state/states/words.state';
import { CommonWordsComponent } from './common-words.component';

describe('WordsComponent', () => {
  let component: CommonWordsComponent;
  let fixture: ComponentFixture<CommonWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonWordsComponent],
      providers: [
        provideStore(
          { [wordsFeature.name]: wordsFeature.reducer },
          { initialState: { [wordsFeature.name]: wordsInitialState } }
        ),
        provideTranslateService()
      ]
    });

    fixture = TestBed.createComponent(CommonWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
