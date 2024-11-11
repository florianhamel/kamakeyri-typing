import { Starter } from '../models/common.types';
import { isAscii } from '../functions/common.functions';

export const usInternationalStarters: ReadonlyArray<Starter> = getStarters();
export const usInternationalSequences: ReadonlyMap<string, string> = getSequences();

export function isUsInternational(char: string) {
  return isAscii(char) || [...usInternationalSequences.values()].includes(char);
}

export function isUsInternationalNoWhitespace(char: string) {
  return /^[!-~]$/.test(char) || [...usInternationalSequences.values()].includes(char);
}

function getStarters(): ReadonlyArray<Starter> {
  return Object.freeze([
    { key: 'Dead', code: 'Quote', shiftKey: false, value: "'" },
    { key: 'Dead', code: 'Quote', shiftKey: true, value: '"' },
    { key: 'Dead', code: 'Backquote', shiftKey: false, value: '`' },
    { key: 'Dead', code: 'Backquote', shiftKey: true, value: '~' },
    { key: 'Dead', code: 'Digit6', shiftKey: true, value: '^' }
  ]);
}

function getSequences(): ReadonlyMap<string, string> {
  return new Map<string, string>([
    ...getSequenceSpecials(),
    ...getSequenceLettersA(),
    ...getSequenceLettersE(),
    ...getSequenceLettersO(),
    ...getSequenceLettersU(),
    ...getSequenceLettersI(),
    ...getSequenceLettersY(),
    ...getSequenceLettersN(),
    ...getSequenceLettersC()
  ]);
}

function getSequenceSpecials(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    ["' ", "'"],
    ['" ', '"'],
    ['` ', '`'],
    ['~ ', '~'],
    ['^ ', '^']
  ]);
}

function getSequenceLettersA(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'a", 'á'],
    ['"a', 'ä'],
    ['`a', 'à'],
    ['~a', 'ã'],
    ['^a', 'â'],
    // Uppercase
    ["'A", 'Á'],
    ['"A', 'Ä'],
    ['`A', 'À'],
    ['~A', 'Ã'],
    ['^A', 'Â']
  ]);
}

function getSequenceLettersE(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'e", 'é'],
    ['"e', 'ë'],
    ['`e', 'è'],
    ['^e', 'ê'],
    // Uppercase
    ["'E", 'É'],
    ['"E', 'Ë'],
    ['`E', 'È'],
    ['^E', 'Ê']
  ]);
}

function getSequenceLettersI(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'i", 'í'],
    ['"i', 'ï'],
    ['`i', 'ì'],
    ['^i', 'î'],
    // Uppercase
    ["'I", 'Í'],
    ['"I', 'Ï'],
    ['`I', 'Ì'],
    ['^I', 'Î']
  ]);
}

function getSequenceLettersO(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'o", 'ó'],
    ['"o', 'ö'],
    ['`o', 'ò'],
    ['~o', 'õ'],
    ['^o', 'ô'],
    // Uppercase
    ["'O", 'Ó'],
    ['"O', 'Ö'],
    ['`O', 'Ò'],
    ['~O', 'Õ'],
    ['^O', 'Ô']
  ]);
}

function getSequenceLettersU(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'u", 'ú'],
    ['"u', 'ü'],
    ['`u', 'ù'],
    ['^u', 'û'],
    // Uppercase
    ["'U", 'Ú'],
    ['"U', 'Ü'],
    ['`U', 'Ù'],
    ['^U', 'Û']
  ]);
}

function getSequenceLettersY(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ['"y', 'ÿ'],
    // Uppercase
    ['"Y', 'Ÿ']
  ]);
}

function getSequenceLettersN(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ['~n', 'ñ'],
    // Uppercase
    ['~N', 'Ñ']
  ]);
}

function getSequenceLettersC(): ReadonlyArray<[string, string]> {
  return Object.freeze([
    // Lowercase
    ["'c", 'ç'],
    // Uppercase
    ["'C", 'Ç']
  ]);
}
