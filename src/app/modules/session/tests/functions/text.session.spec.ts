import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionChar } from '../../models/session.types';
import { firstIndex, initSessionChars } from '../../functions/common.session';
import { isUsInternational } from '../../../common/layouts/us-international.layout';

describe('text session', () => {
  beforeEach(() => {
    const sessionChars: ReadonlyArray<SessionChar> = initSessionChars('Hello World!', isUsInternational);
    TestBed.configureTestingModule({
      providers: provideMockStore({
        initialState: {
          start: null,
          end: null,
          index: firstIndex(sessionChars),
          keystrokes: 0,
          errors: 0,
          status: 'notStarted'
        }
      })
    });
  });

  it('should process standard input', () => {
    // given
    // when
    // then
  });
});
