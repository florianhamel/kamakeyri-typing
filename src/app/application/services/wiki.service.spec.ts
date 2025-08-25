import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import { WikiService } from './wiki.service';

describe('WikiService', () => {
  let sutService: WikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideStore()]
    });
    sutService = TestBed.inject(WikiService);
  });

  it('should be created', () => {
    expect(sutService).toBeTruthy();
  });
});
