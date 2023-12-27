import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiTypingComponent } from './wiki-typing.component';

describe('WikiTypingComponent', () => {
  let component: WikiTypingComponent;
  let fixture: ComponentFixture<WikiTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiTypingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WikiTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
