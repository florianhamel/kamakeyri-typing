import { usInternationalSequences } from '../layouts/us-international.layout';

export function isUndefined(obj: any): boolean {
  return obj === undefined;
}

export function isNull(obj: any): boolean {
  return obj === null;
}

export function exists(obj: any): boolean {
  return !isUndefined(obj) && !isNull(obj);
}

export function isAscii(char: string): boolean {
  return /^[ -~\n]*$/.test(char);
}

export function isWord(char: string): boolean {
  return /^\w$/.test(char) || [...usInternationalSequences.values()].includes(char);
}

export function isSpace(char: string): boolean {
  return char === ' ';
}

export function isWhitespace(char: string): boolean {
  return /^\s$/.test(char);
}

export function isNewline(char: string): boolean {
  return char === '\n';
}
