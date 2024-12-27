import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SessionMetaData } from '../../domain/types/session.types';
import { InputEventSanitized } from '../../domain/types/event.types';

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
