import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { InputEventSanitized } from '../../../domain/types/event.type';
import { SessionMetaData, SessionRecord } from '../../../domain/types/session.type';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: InputEventSanitized }>(),
    reset: emptyProps(),
    close: props<SessionMetaData>(),
    uploadAllSaved: emptyProps(),
    uploadAllSavedSuccess: emptyProps(),
    loadAll: emptyProps(),
    loadAllSuccess: props<{ sessionRecords: ReadonlyArray<SessionRecord> }>(),
    loadAllError: emptyProps()
  }
});
