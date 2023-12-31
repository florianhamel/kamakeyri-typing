import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    update: props<{ event: KeyboardEvent }>(),
    reset: emptyProps()
  }
});
