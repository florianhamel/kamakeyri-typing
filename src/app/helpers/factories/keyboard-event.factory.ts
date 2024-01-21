export function keyboardEventFactory(
  key: string,
  code: string,
  altKey?: boolean,
  ctrlKey?: boolean,
  shiftKey?: boolean
) {
  return new KeyboardEvent('keydown', {
    key,
    code,
    altKey,
    ctrlKey,
    shiftKey
  });
}
