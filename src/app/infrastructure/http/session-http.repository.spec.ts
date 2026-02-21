import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SessionHttpRepository } from './session-http.repository';

describe('SessionHttpRepository', () => {
  let repository: SessionHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionHttpRepository, provideHttpClient()]
    });
    repository = TestBed.inject(SessionHttpRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
