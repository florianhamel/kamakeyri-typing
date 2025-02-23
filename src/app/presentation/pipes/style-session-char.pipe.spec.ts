import { StyleSessionCharPipe } from './style-session-char.pipe';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('StyleSessionCharPipe', () => {
  let sutPipe: StyleSessionCharPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), StyleSessionCharPipe ]
    });

    sutPipe = TestBed.inject(StyleSessionCharPipe);
  });

  it('should be created', () => {
    expect(sutPipe).toBeTruthy();
  });
});
