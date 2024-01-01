import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: props<{ intervalId: number }>(),
    update: props<{ event: KeyboardEvent }>(),
    reset: emptyProps(),
    close: emptyProps(),
    updateTimer: emptyProps()
  }
});
