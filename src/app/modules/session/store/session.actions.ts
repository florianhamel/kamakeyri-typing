import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SessionMetaData } from '../models/session.types';
import { InputEventSanitized } from '../../../common/types';

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
