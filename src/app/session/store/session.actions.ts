import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SessionMetaData } from '../models/session.types';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: KeyboardEvent }>(),
    reset: emptyProps(),
    close: emptyProps(),
    save: props<SessionMetaData>(),
    upload: props<SessionMetaData>()
  }
});
