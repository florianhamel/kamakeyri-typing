import { InputEventSanitized } from '../types';

export function isBackspace(event: InputEventSanitized): boolean {
  return event.inputType === 'deleteContentBackward';
}

export function isMacosAutoDot(event: InputEventSanitized): boolean {
  return event.data === '. ';
}
