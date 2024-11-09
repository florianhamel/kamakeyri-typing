export type AuthState = {
  username: string | null;
  exp: number | null;
};

export type UserInfo = {
  username: string;
  exp: number;
};

export type Credentials = {
  username: string;
  password: string;
};

export type Starter = {
  key: string;
  code: string;
  shiftKey: boolean;
  value: string;
};

export type InputEventSanitized = InputEvent & {
  readonly inputType:
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
};
