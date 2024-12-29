import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsTypingComponent } from './words-typing.component';

describe('WordsComponent', () => {
  let component: WordsTypingComponent;
  let fixture: ComponentFixture<WordsTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsTypingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
