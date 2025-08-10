import { SessionState } from '../../state/states/session.state';
import { InputEventSanitized } from '../types/event.types';
import { SessionChar, SessionCharsIndex } from '../types/session.types';
import { exists, isNewline, isSpace, isUndefined, isWord } from './common.functions';
import { isMacosAutoDot } from './input-event.functions';
import { currentSessionChar, isCorrect, moveBackwardFrom, moveForwardFrom, sessionCharAt } from './session-common.functions';





export function processBackspaceChar(state: SessionState): SessionState {
  const end = new Date();
  const index = moveBackwardFrom(state.index, state.sessionChars);
  const sessionChars = state.sessionChars.with(index, {
    ...sessionCharAt(index, state.sessionChars)!,
    input: null
  });

  return {
    ...state,
    end,
    sessionChars,
    index
  };
}

/**
 * @ImplemNotes
 * Couldn't do much better, didn't want to invest more time into refactoring this shit
 */
export function processBackspaceWord(state: SessionState): SessionState {
  const current = () => sessionCharAt(index, sessionChars);
  const end = new Date();
  let sessionChars = state.sessionChars;
  let index = moveBackwardFrom(state.index, state.sessionChars);
  while (exists(current()?.input) && isSpace(current()!.input!)) {
    ({ sessionChars, index } = del(sessionChars, index));
  }
  if (exists(current()?.input) && isNewline(current()!.input!)) {
    ({ sessionChars, index } = del(sessionChars, index));
  } else {
    if (exists(current()?.input) && !isWord(current()!.input!)) {
      while (
        exists(current()?.input) &&
        !isWord(current()!.input!) &&
        !isNewline(current()!.input!) &&
        !isSpace(current()!.input!)
      ) {
        ({ sessionChars, index } = del(sessionChars, index));
      }
    } else {
      while (exists(current()?.input) && isWord(current()!.input!)) {
        ({ sessionChars, index } = del(sessionChars, index));
      }
    }
  }

  return {
    ...state,
    end,
    sessionChars,
    index: index > 0 ? moveForwardFrom(index, sessionChars) : 0
  };
}

export function processComposition(state: SessionState, event: InputEventSanitized): SessionState {
  return state.isComposing ? endComposition(state, event) : startComposition(state, event);
}

export function processStandard(state: SessionState, event: InputEventSanitized): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const end = new Date();
  const index = moveForwardFrom(state.index, state.sessionChars);
  const updated = {
    ...currentSessionChar(state)!,
    input: sanitizeData(event)
  };
  const sessionChars = state.sessionChars.with(state.index, updated);
  const keystrokes = state.keystrokes + 1;
  const errors = isCorrect(updated) ? state.errors : state.errors + 1;

  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function del(sessionChars: ReadonlyArray<SessionChar>, index: number): SessionCharsIndex {
  sessionChars = sessionChars.with(index, { ...sessionCharAt(index, sessionChars)!, input: null });
  index = moveBackwardFrom(index, sessionChars);

  return { sessionChars, index };
}

function startComposition(state: SessionState, event: InputEventSanitized): SessionState {
  const end = new Date();
  const index = moveForwardFrom(state.index, state.sessionChars);
  const sessionChars = state.sessionChars.with(state.index, {
    ...currentSessionChar(state)!,
    input: event.data
  });

  return {
    ...state,
    end,
    sessionChars,
    index,
    isComposing: true
  };
}

function endComposition(state: SessionState, event: InputEventSanitized): SessionState {
  const sessionState =
    hasCompositionFailed(event) ? endCompositionFailure(state, event) : endCompositionSuccess(state, event);

  return {
    ...sessionState,
    isComposing: false
  };
}

function hasCompositionFailed(event: InputEventSanitized): boolean {
  return event.data?.length === 2;
}

function endCompositionFailure(state: SessionState, event: InputEventSanitized) {
  const end = new Date();
  const index = moveForwardFrom(state.index, state.sessionChars);
  const sessionChars = state.sessionChars.toSpliced(
    state.index - 1,
    2,
    {
      ...sessionCharAt(state.index - 1, state.sessionChars)!,
      input: event.data?.charAt(0)!
    },
    {
      ...sessionCharAt(state.index, state.sessionChars)!,
      input: event.data?.charAt(1)!
    }
  );

  return {
    ...state,
    end,
    sessionChars,
    index
  };
}

function endCompositionSuccess(state: SessionState, event: InputEventSanitized) {
  const end = new Date();
  const indexLast = moveBackwardFrom(state.index, state.sessionChars);
  const sessionChars = state.sessionChars.with(indexLast, {
    ...sessionCharAt(indexLast, state.sessionChars)!,
    input: event.data
  });
  const isComposing = false;

  return {
    ...state,
    end,
    sessionChars,
    isComposing
  };
}

function sanitizeData(event: InputEventSanitized): string | null {
  if (isMacosAutoDot(event)) {
    return ' ';
  }
  if (event.inputType === 'insertLineBreak') {
    return '\n';
  }

  return event.data;
}
