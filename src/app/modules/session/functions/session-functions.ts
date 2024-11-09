import { SessionChar, SessionState } from '../models/session.types';
import {
  currentSessionChar,
  getStarter,
  isCorrect,
  moveBackwardIfPossible,
  moveForwardAtLeast,
  sessionCharAt
} from './session-common';
import { InputEventSanitized, Starter } from '../../../common/types';
import { isUndefined } from '../../../common/checks/common.check';
import { isMacosAutoDot } from '../../../common/checks/input-event.check';

/*** Sequence */
export function processedBackspaceSeq(state: SessionState): SessionState {
  const end: Date = new Date();
  const updated: SessionChar = { ...currentSessionChar(state)!, input: null };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  return {
    ...state,
    end,
    sessionChars
  };
}

export function processedStarterSeq(
  state: SessionState,
  event: KeyboardEvent,
  starters: ReadonlyArray<Starter>
): SessionState {
  const end: Date = new Date();
  const index: number = moveForwardAtLeast(state, 1);
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(sessionCharAt(state, index))
                                                   ? state.sessionChars
                                                   : state.sessionChars.with(index, {
      ...sessionCharAt(state, index)!,
      input: getStarter(event, starters)!
    });
  const keystrokes: number = state.keystrokes + 1;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

export function processedExtensionSeq(
  state: SessionState,
  event: KeyboardEvent,
  sequences: ReadonlyMap<string, string>
): SessionState {
  const key: string = currentSessionChar(state)!.input + event.key;
  if (sequences.has(key)) return processedValidSeq(state, sequences.get(key)!);
  return processedInvalidSeq(state, event);
}

function processedValidSeq(state: SessionState, sequence: string): SessionState {
  const end: Date = new Date();
  const index: number = moveForwardAtLeast(state, 1);
  const updated: SessionChar = { ...currentSessionChar(state)!, input: sequence };
  const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currentSessionChar(state)!) ? state.errors : state.errors + 1;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

function processedInvalidSeq(state: SessionState, event: KeyboardEvent): SessionState {
  const end: Date = new Date();
  const index: number = isUndefined(sessionCharAt(state, state.index + 1))
                        ? moveForwardAtLeast(state, 1)
                        : moveForwardAtLeast(state, 2);
  const sessionChars: ReadonlyArray<SessionChar> = isUndefined(sessionCharAt(state, index))
                                                   ? state.sessionChars
                                                   : state.sessionChars.with(index,
      { ...sessionCharAt(state, index)!, input: event.key });
  const keystrokes: number = state.keystrokes + 2;
  const errors: number = isCorrect(currentSessionChar(state)!)
                         ? isUndefined(sessionCharAt(state, index)) || isCorrect(
      sessionCharAt(state, index)!)
                           ? state.errors
                           : state.errors + 1
                         : isUndefined(sessionCharAt(state, index)) || isCorrect(
      sessionCharAt(state, index)!)
                           ? state.errors + 1
                           : state.errors + 2;
  return {
    ...state,
    end,
    sessionChars,
    index,
    keystrokes,
    errors
  };
}

export function processComposition(state: SessionState, event: InputEventSanitized): SessionState {
  if (state.isComposing) {
    return endComposition(state, event);
  }
  return startComposition(state, event);
}

function startComposition(state: SessionState, event: InputEventSanitized): SessionState {
  const end = new Date();
  const index = moveForwardAtLeast(state, 1);
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
  const sessionState = hasCompositionFailed(event) ? endCompositionFailure(state, event)
                                                   : endCompositionSuccess(state, event);
  return {
    ...sessionState,
    isComposing: false
  };
}

function endCompositionFailure(state: SessionState, event: InputEventSanitized) {
  const end = new Date();
  const index = moveForwardAtLeast(state, 1);
  const sessionChars = state.sessionChars.toSpliced(state.index - 1, 2,
    {
      ...sessionCharAt(state, state.index - 1)!,
      input: event.data?.charAt(0)!
    },
    {
      ...sessionCharAt(state, state.index)!,
      input: event.data?.charAt(1)!
    });

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
    ...sessionCharAt(state, state.index - 1)!,
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

function hasCompositionFailed(event: InputEventSanitized): boolean {
  return event.data?.length === 2;
}

export function processBackspaceChar(state: SessionState): SessionState {
  const end = new Date();
  const index = moveBackwardIfPossible(state);
  const sessionChars = state.sessionChars.with(index, {
    ...sessionCharAt(state, index)!,
    input: null
  });
  return {
    ...state,
    end,
    sessionChars,
    index
  };
}

export function processStandard(state: SessionState, event: InputEventSanitized): SessionState {
  if (isUndefined(currentSessionChar(state))) return state;
  const end = new Date();
  const index = moveForwardAtLeast(state, 1);
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

function sanitizeData(event: InputEventSanitized): string | null {
  if (isMacosAutoDot(event)) {
    return ' ';
  }
  if (event.inputType === 'insertLineBreak') {
    return '\n';
  }

  return event.data;
}

/**
 * @Implementation
 * hello_ --> |
 * hello _ --> |
 * hello  _ --> hello|
 */
// function processedBackspaceWord(state: SessionState): SessionState {
//   const end: Date = new Date();
//   const index: number = wordIndex(state);
//   if (isUndefined(sessionCharAt(state, index))) return { ...state, end };
//   const sessionChars: ReadonlyArray<SessionChar> = deletedLastWord(state, index);
//   return {
//     ...state,
//     end,
//     sessionChars,
//     index
//   };
// }

/**
 * @Implementation
 * RULE: = 0|1 space -> del space + word |  > 1 space -> only del spaces
 * to me a long time from now...
 * state.index - index <= 2 is the case where the cursor in on the char after a word + space
 * example: hello _ (2), hello_ OR hell_ (1)
 **/
// function wordIndex(state: SessionState): number {
//   const isWhiteSpace = () => state.sessionChars[index].target === ' ';
//   let index: number = state.index === 0 ? state.index : state.index - 1;
//   while (0 < index && isWhiteSpace()) --index;
//   while (state.index - index <= 2 && 0 < index && !isWhiteSpace()) --index;
//   return index > 0 ? index + 1 : index;
// }

// function deletedLastWord(state: SessionState, index: number): ReadonlyArray<SessionChar> {
//   return state.sessionChars.map((sessionChar, i) => {
//     if (index <= i) return { ...sessionChar, input: null };
//     return { ...sessionChar };
//   });
// }

// export function processedStarter(
//   state: SessionState,
//   event: KeyboardEvent,
//   starters: ReadonlyArray<Starter>
// ): SessionState {
//   if (isUndefined(currentSessionChar(state))) return state;
//   const end: Date = new Date();
//   const updated: SessionChar = {
//     ...currentSessionChar(state)!,
//     input: getStarter(event, starters)!
//   };
//   const sessionChars: ReadonlyArray<SessionChar> = state.sessionChars.with(state.index, updated);
//   return {
//     ...state,
//     end,
//     sessionChars
//   };
// }
