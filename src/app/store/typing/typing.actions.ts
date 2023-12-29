import { createActionGroup, props } from '@ngrx/store';

export const typingActions = createActionGroup({
  source: 'typing',
  events: {
    startSession: props<{ content: string }>()
  }
});
