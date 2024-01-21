import { TestBed } from '@angular/core/testing';

import { WikiService } from './wiki.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WikiService', () => {
  let service: WikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WikiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
