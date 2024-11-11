import { Type } from '@angular/core';
import { WikiOption } from '../../wiki/models/wiki.types';

export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';

export type SessionState = {
  start: Date | null;
  end: Date | null;
  index: number;
  sessionChars: ReadonlyArray<SessionChar>;
  keystrokes: number;
  errors: number;
  status: SessionStatus;
  isComposing: boolean;
};

export type SessionCharsIndex = {
  sessionChars: ReadonlyArray<SessionChar>;
  index: number;
}

export type SessionChar = {
  target: string;
  input: string | null;
  enabled: boolean;
};

export type SessionDataItem = {
  transl: string;
  formatter: (sessionState: SessionState) => string;
  svgComponent?: Type<any>;
};

export type SessionRefined = {
  time: number;
  length: number;
  keystrokes: number;
  errors: number;
};

export type SessionMetaData =
  | {
      mode: 'wiki';
      label: string | null;
      option: WikiOption | null;
    }
  | {
      mode: 'training';
      label: string;
      option: 'TrainingOption';
    };

export type SessionDto = SessionRefined & SessionMetaData;

export type InputEventSanitized = InputEvent & { readonly inputType: InputType };

export type InputType =
  | 'insertText'
  | 'insertReplacementText'
  | 'insertLineBreak'
  | 'insertParagraph'
  | 'insertOrderedList'
  | 'insertUnorderedList'
  | 'insertHorizontalRule'
  | 'insertFromYank'
  | 'insertFromDrop'
  | 'insertFromPaste'
  | 'insertFromPasteAsQuotation'
  | 'insertTranspose'
  | 'insertCompositionText'
  | 'insertLink'
  | 'deleteWordBackward'
  | 'deleteWordForward'
  | 'deleteSoftLineBackward'
  | 'deleteSoftLineForward'
  | 'deleteEntireSoftLine'
  | 'deleteHardLineBackward'
  | 'deleteHardLineForward'
  | 'deleteByDrag'
  | 'deleteByCut'
  | 'deleteContent'
  | 'deleteContentBackward'
  | 'deleteContentForward'
  | 'historyUndo'
  | 'historyRedo'
  | 'formatBold'
  | 'formatItalic'
  | 'formatUnderline'
  | 'formatStrikeThrough'
  | 'formatSuperscript'
  | 'formatSubscript'
  | 'formatJustifyFull'
  | 'formatJustifyCenter'
  | 'formatJustifyRight'
  | 'formatJustifyLeft'
  | 'formatIndent'
  | 'formatOutdent'
  | 'formatRemove'
  | 'formatSetBlockTextDirection'
  | 'formatSetInlineTextDirection'
  | 'formatBackColor'
  | 'formatFontColor'
  | 'formatFontName';
