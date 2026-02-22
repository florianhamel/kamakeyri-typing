import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UserHttpRepository } from './user-http.repository';

describe('UserHttpRepository', () => {
  let service: UserHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHttpRepository, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
