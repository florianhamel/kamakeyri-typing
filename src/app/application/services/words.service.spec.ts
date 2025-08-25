import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WordsService } from './words.service';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
