import { isWhitespace } from '../functions/common.functions';

describe('common functions', () => {


  it.each([
    // Given
    ['\n', true],
    ['\r', true],
    [' ', true],
    ['a', false]
  ])('should match white space', (char, expected) => {
    // When & Then
    expect(isWhitespace(char)).toBe(expected);
  })
})
