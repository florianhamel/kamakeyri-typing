import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InputEventSanitized, SessionMetaData } from '../../domain/types/session.types';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: InputEventSanitized }>(),
    reset: emptyProps(),
    close: emptyProps(),
    uploadOrSave: props<SessionMetaData>(),
    uploadAllSaved: emptyProps()
  }
});
