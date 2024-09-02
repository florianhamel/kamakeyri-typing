import { Starter } from '../types';

export const azertyStarters: ReadonlyArray<Starter> = getStarters();
export const azertySequences: ReadonlyMap<string, string> = getSequences

function getStarters() {
  return Object.freeze([
    { key: 'Dead', code: 'Quote', shiftKey: false, value: "'" },
    { key: 'Dead', code: 'Quote', shiftKey: true, value: '"' },
    { key: 'Dead', code: 'Backquote', shiftKey: false, value: '`' },
    { key: 'Dead', code: 'Backquote', shiftKey: true, value: '~' },
    { key: 'Dead', code: 'Digit6', shiftKey: true, value: '^' }
  ]);
}

function getSequences() {
  return ;
}
