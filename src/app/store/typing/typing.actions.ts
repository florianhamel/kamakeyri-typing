import { createActionGroup, props } from '@ngrx/store';
import { TypingData } from '../../models/types';

export const typingActions = createActionGroup({
  source: 'typing',
  events: {
    updateContent: props<{ content: string }>(),
    updateTypingData: props<TypingData>(),
    updateKeystrokes: props<{ keystrokes: number }>()
  }
});
