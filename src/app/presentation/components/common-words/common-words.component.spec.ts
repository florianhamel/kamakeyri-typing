import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWordsComponent } from './common-words.component';

describe('WordsComponent', () => {
  let component: CommonWordsComponent;
  let fixture: ComponentFixture<CommonWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
