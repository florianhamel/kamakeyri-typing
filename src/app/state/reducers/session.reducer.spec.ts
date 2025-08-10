import { InputEventSanitized } from '../../domain/types/event.types';
import { sessionActions } from '../actions/session.actions';
import { SessionState, initialState } from '../states/session.state';
import { sessionFeature } from './session.reducer';

describe('session reducer', () => {
  describe('session action: initialize', () => {
    it('should initialize session with standard content', () => {
      // Given
      let state: SessionState = initialState;
      const content: string = 'Hello World!';

      // When
      state = sessionFeature.reducer(state, sessionActions.init({ content }));

      // Then
      expect(state.start).toBe(null);
      expect(state.end).toBe(null);
      expect(state.index).toBe(0);
      expect(state.sessionChars.length).toBe(content.length);
      expect(state.keystrokes).toBe(0);
      expect(state.errors).toBe(0);
      expect(state.status).toBe('notStarted');
    });
  });

  describe('session action: start', () => {
    it('should start a session', () => {
      // Given
      let state: SessionState = initialState;

      // When
      state = sessionFeature.reducer(state, sessionActions.start());

      // Then
      expect(state.start).not.toBe(null);
      expect(state.end).not.toBe(null);
      expect(state.index).toBe(0);
      expect(state.sessionChars).toStrictEqual([]);
      expect(state.keystrokes).toBe(0);
      expect(state.errors).toBe(0);
      expect(state.status).toBe('inProgress');
    });
  });

  describe('session action: update', () => {
    it('should process standard input', () => {
      // Given
      let state: SessionState = initialState;
      state = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello World!' }));
      state = sessionFeature.reducer(state, sessionActions.start());
      const event = { inputType: 'insertText', isComposing: false, data: 'H' } as InputEventSanitized;

      // When
      state = sessionFeature.reducer(state, sessionActions.update({ event }));

      // Then
      expect(state.start).not.toBe(null);
      expect(state.end).not.toBe(null);
      expect(state.index).toBe(1);
      expect(state.sessionChars[0].input).toBe('H');
      expect(state.keystrokes).toBe(1);
      expect(state.errors).toBe(0);
      expect(state.status).toBe('inProgress');
    });

    it('should process a simple backspace', () => {
      // Given
      let state: SessionState = initialState;
      state = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello World!' }));
      state = sessionFeature.reducer(state, sessionActions.start());
      state.index = 1;
      state.sessionChars = state.sessionChars.with(1, { ...state.sessionChars[0], input: 'H' });

      const event = { inputType: 'deleteContentBackward' } as InputEventSanitized;

      // When
      state = sessionFeature.reducer(state, sessionActions.update({ event }));

      // Then
      expect(state.index).toBe(0);
      expect(state.sessionChars[0].input).toBe(null);
    });

    it('should process a word backspace', () => {
      // Given
      let state: SessionState = initialState;
      state = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello World!' }));
      state = sessionFeature.reducer(state, sessionActions.start());
      state.index = 6;
      state.sessionChars = state.sessionChars.map((sessionChar, i) =>
        i < 6 ? { ...sessionChar, input: sessionChar.target } : sessionChar
      );
      const event = { inputType: 'deleteWordBackward' } as InputEventSanitized;

      // When
      state = sessionFeature.reducer(state, sessionActions.update({ event }));

      // Then
      expect(state.index).toBe(0);
      state.sessionChars.forEach((sessionChar) => expect(sessionChar.input).toBe(null));
    });
  });

  describe('session action: close', () => {
    it('should close session', () => {
      // Given
      let state: SessionState = initialState;
      state = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello World!' }));
      state = sessionFeature.reducer(state, sessionActions.start());

      // When
      state = sessionFeature.reducer(state, sessionActions.close());

      // Then
      expect(state.status).toBe('closed');
    });
  });
});
