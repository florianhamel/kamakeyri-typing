import { Injectable } from '@angular/core';
import { Starter } from '../../models/types';

// TODO probably to be deted
@Injectable({
  providedIn: 'root'
})
export class UsInternationalService {
  readonly starters: ReadonlyArray<Starter> = this.getStarters();
  readonly sequences: ReadonlyMap<string, string> = this.getSequences();

  constructor() {}

  private getStarters(): ReadonlyArray<Starter> {
    return Object.freeze([
      { key: 'Dead', code: 'Quote', shiftKey: true },
      { key: 'Dead', code: 'Quote', shiftKey: false },
      { key: 'Dead', code: 'Backquote', shiftKey: false },
      { key: 'Dead', code: 'Backquote', shiftKey: true },
      { key: 'Dead', code: 'Digit6', shiftKey: true }
    ]);
  }

  private getSequences(): ReadonlyMap<string, string> {
    return new Map<string, string>([
      ...this.getSequenceSpecials(),
      ...this.getSequenceLettersA(),
      ...this.getSequenceLettersE(),
      ...this.getSequenceLettersO(),
      ...this.getSequenceLettersU(),
      ...this.getSequenceLettersI(),
      ...this.getSequenceLettersY(),
      ...this.getSequenceLettersN(),
      ...this.getSequenceLettersC()
    ]);
  }

  private getSequenceSpecials(): ReadonlyArray<[string, string]> {
    return Object.freeze([
      ["' ", "'"],
      ['" ', '"'],
      ['` ', '`'],
      ['~ ', '~'],
      ['^ ', '^']
    ]);
  }

  private getSequenceLettersA(): ReadonlyArray<[string, string]> {
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

  private getSequenceLettersE(): ReadonlyArray<[string, string]> {
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

  private getSequenceLettersI(): ReadonlyArray<[string, string]> {
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

  private getSequenceLettersO(): ReadonlyArray<[string, string]> {
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

  private getSequenceLettersU(): ReadonlyArray<[string, string]> {
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

  private getSequenceLettersY(): ReadonlyArray<[string, string]> {
    return Object.freeze([
      // Lowercase
      ['"y', 'ÿ'],
      // Uppercase
      ['"Y', 'Ÿ']
    ]);
  }

  private getSequenceLettersN(): ReadonlyArray<[string, string]> {
    return Object.freeze([
      // Lowercase
      ['~n', 'ñ'],
      // Uppercase
      ['~N', 'Ñ']
    ]);
  }

  private getSequenceLettersC(): ReadonlyArray<[string, string]> {
    return Object.freeze([
      // Lowercase
      ["'c", 'ç'],
      // Uppercase
      ["'C", 'Ç']
    ]);
  }
}
