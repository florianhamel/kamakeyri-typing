import { FormatSessionCharPipe } from './format-session-char.pipe';
import { TestBed } from '@angular/core/testing';

describe('FormatSessionCharPipe', () => {
  let sutPipe: FormatSessionCharPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatSessionCharPipe]
    });

    sutPipe = TestBed.inject(FormatSessionCharPipe);
  });

  it('create an instance', () => {
    expect(sutPipe).toBeTruthy();
  });
});
