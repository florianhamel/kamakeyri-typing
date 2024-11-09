import { InputEventSanitized } from '../types';
import { isBackspace, isMacosAutoDot } from '../checks/input-event.check';

describe('input event checks', () => {
  it.each([
    // Given
    [{ inputType: 'insertText' } as InputEventSanitized, false],
    [{ inputType: 'deleteContentBackward' } as InputEventSanitized, true]
  ])('should check if input is backspace', (event, expected) => {
    // When & Then
    expect(isBackspace(event)).toEqual(expected);
  });

  it.each([
    // Given
    [{ data: ' ' } as InputEventSanitized, false],
    [{ data: '. ' } as InputEventSanitized, true]
  ])('should check if event data contains dot and space', (event, expected) => {
    // When & Then
    expect(isMacosAutoDot(event)).toEqual(expected);
  });
});
