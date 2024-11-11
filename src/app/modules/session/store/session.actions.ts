import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InputEventSanitized, SessionMetaData } from '../models/session.types';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: InputEventSanitized }>(),
    reset: emptyProps(),
    close: emptyProps(),
    upload: props<SessionMetaData>(),
    uploadAll: emptyProps()
  }
});
