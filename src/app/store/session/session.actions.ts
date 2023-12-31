import { createActionGroup, props } from '@ngrx/store';

export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    startSession: props<{ content: string }>(),
    handleKeyPressed: props<{ event: KeyboardEvent }>()
  }
});
