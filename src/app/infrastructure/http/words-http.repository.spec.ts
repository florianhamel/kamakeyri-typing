import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { WordsHttpRepository } from './words-http.repository';

describe('WordsHttpRepository', () => {
  let service: WordsHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordsHttpRepository, provideHttpClient()]
    });
    service = TestBed.inject(WordsHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
