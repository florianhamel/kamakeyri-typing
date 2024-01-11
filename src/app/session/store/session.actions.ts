import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { empty } from 'rxjs';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: KeyboardEvent }>(),
    reset: emptyProps(),
    close: emptyProps(),
    updateTimer: emptyProps(),
    closeIfNeeded: emptyProps(),
    save: emptyProps(),
    upload: emptyProps()
  }
});
