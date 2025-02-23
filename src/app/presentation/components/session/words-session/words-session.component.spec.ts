import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSessionComponent } from './words-session.component';

describe('WordsSessionComponent', () => {
  let component: WordsSessionComponent;
  let fixture: ComponentFixture<WordsSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
