import { createFeature, createReducer, on } from '@ngrx/store';
import { TypingData } from '../../models/types';
import { typingActions } from './typing.actions';

type State = Readonly<{
  content: string;
  typingData: TypingData;
}>;

export const initialState: State = {
  content: 'Hello',
  typingData: {
    keystrokes: 0,
    errors: 0
  }
};

export const typingFeature = createFeature({
  name: 'typing',
  reducer: createReducer(
    initialState,
    on(typingActions.updateContent, (state, { content }) => ({ ...state, content })),
    on(typingActions.updateTypingData, (state, typingData) => ({ ...state, typingData })),
    on(typingActions.updateKeystrokes, (state, { keystrokes }) => ({
      ...state,
      typingData: { ...state.typingData, keystrokes }
    }))
  )
});

export const { name, reducer, selectContent, selectTypingData, selectTypingState } = typingFeature;
