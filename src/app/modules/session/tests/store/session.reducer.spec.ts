import { sessionFeature } from '../../store/session.reducer';
import { initialState } from '../../store/session.state';
import { sessionActions } from '../../store/session.actions';
import { SessionState } from '../../models/session.types';
import { InputEventSanitized } from '../../../../common/types';

describe('session action: initialize', () => {
  it('should initialize session with standard content', () => {
    // given
    let state: SessionState = initialState;
    const content: string = 'Hello World!';

    // when
    state = sessionFeature.reducer(state, sessionActions.init({ content }));

    // then
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
    // given
    let state: SessionState = initialState;

    // when
    state = sessionFeature.reducer(state, sessionActions.start());

    // then
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
    state = sessionFeature.reducer(
      state,
      sessionActions.update({
        event: {
          inputType: 'insertText',
          isComposing: false,
          data: 'H'
        } as InputEventSanitized
      })
    );
    const event = {
      event: {
        inputType: 'deleteContentBackward',
        isComposing: false,
        data: 'H'
      } as InputEventSanitized
    };

    // When
  });
});

describe('session action: close', () => {
  it('should close session', () => {
    // given
    let state: SessionState = initialState;
    state = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello World!' }));
    state = sessionFeature.reducer(state, sessionActions.start());

    // when
    state = sessionFeature.reducer(state, sessionActions.close());

    // then
    expect(state.status).toBe('closed');
  });
});
