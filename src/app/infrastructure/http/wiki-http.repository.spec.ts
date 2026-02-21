import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';

import { WikiHttpRepository } from './wiki-http.repository';

describe('WikiHttpRepository', () => {
  let service: WikiHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WikiHttpRepository, provideHttpClient(), provideStore()]
    });
    service = TestBed.inject(WikiHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
