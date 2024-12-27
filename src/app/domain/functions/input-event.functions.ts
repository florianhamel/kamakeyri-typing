import { InputType } from 'node:zlib';
import { InputEventSanitized } from '../types/event.types';

const inputTypesAllowed = new Set<InputType>([
  'insertText',
  'insertCompositionText',
  'deleteContentBackward',
  'deleteWordBackward',
  'insertLineBreak'
]);

export function isForbidden(event: InputEventSanitized): boolean {
  return !inputTypesAllowed.has(event.inputType);
}

export function isBackspace(event: InputEventSanitized): boolean {
  return event.inputType === 'deleteContentBackward';
}

export function isBackspaceWord(event: InputEventSanitized): boolean {
  return event.inputType === 'deleteWordBackward';
}

export function isComposing(event: InputEventSanitized): boolean {
  return event.isComposing;
}

export function isMacosAutoDot(event: InputEventSanitized): boolean {
  return event.data === '. ';
}
