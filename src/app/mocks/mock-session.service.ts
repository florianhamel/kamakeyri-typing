import { Injectable } from '@angular/core';

@Injectable()
export class MockSessionService {
  constructor() {}

  uploadSessions = jest.fn();
}
