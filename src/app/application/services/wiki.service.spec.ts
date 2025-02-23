import { TestBed } from '@angular/core/testing';

import { WikiService } from './wiki.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('WikiService', () => {
  let sutService: WikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    sutService = TestBed.inject(WikiService);
  });

  it('should be created', () => {
    expect(sutService).toBeTruthy();
  });
});
