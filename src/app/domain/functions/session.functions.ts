import {
  currentSessionChar,
  isCorrect,
  moveBackwardFrom,
  moveForwardFrom,
  sessionCharAt
} from './session-common.functions';
import { isMacosAutoDot } from './input-event.functions';
import {
  InputEventSanitized,
  SessionChar,
  SessionCharsIndex,
  SessionState
} from '../types/session.types';
import { exists, isNewline, isSpace, isUndefined, isWord } from './common.functions';

export function processBackspaceChar(state: SessionState): SessionState {
  const end = new Date();
  const index = moveBackwardFrom(state.sessionChars, state.index);
  const sessionChars = state.sessionChars.with(index, {
    ...sessionCharAt(state.sessionChars, index)!,
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
  const current = () => sessionCharAt(sessionChars, index);
  const end = new Date();
  let sessionChars = state.sessionChars;
  let index = moveBackwardFrom(state.sessionChars, state.index);
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
    index: index > 0 ? moveForwardFrom(sessionChars, index) : 0
  };
}

export function processComposition(state: SessionState, event: InputEventSanitized): SessionState {
  return state.isComposing ? endComposition(state, event) : startComposition(state, event);
}

export function processStandard(state: SessionState, event: InputEventSanitized): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const end = new Date();
  const index = moveForwardFrom(state.sessionChars, state.index);
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
  sessionChars = sessionChars.with(index, { ...sessionCharAt(sessionChars, index)!, input: null });
  index = moveBackwardFrom(sessionChars, index);

  return { sessionChars, index };
}

function startComposition(state: SessionState, event: InputEventSanitized): SessionState {
  const end = new Date();
  const index = moveForwardFrom(state.sessionChars, state.index);
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
  const index = moveForwardFrom(state.sessionChars, state.index);
  const sessionChars = state.sessionChars.toSpliced(
    state.index - 1,
    2,
    {
      ...sessionCharAt(state.sessionChars, state.index - 1)!,
      input: event.data?.charAt(0)!
    },
    {
      ...sessionCharAt(state.sessionChars, state.index)!,
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
  const sessionChars = state.sessionChars.with(state.index - 1, {
    ...sessionCharAt(state.sessionChars, state.index - 1)!,
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
