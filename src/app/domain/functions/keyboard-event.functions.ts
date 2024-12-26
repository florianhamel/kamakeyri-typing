const functionInputs: Set<string> = new Set<string>([
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
  'Home',
  'End',
  'Shift',
  'Control',
  'Meta',
  'Alt',
  'Tab'
]);

export function isFunctional(event: KeyboardEvent): boolean {
  return functionInputs.has(event.key);
}

export function isRepeat(event: KeyboardEvent): boolean {
  return event.repeat && event.key !== 'Backspace';
}

export function isEscape(event: KeyboardEvent): boolean {
  return event.key === 'Escape';
}
