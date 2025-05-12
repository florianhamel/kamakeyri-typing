import { SessionOption } from '../../domain/enums/session-option.enum';
import { WikiLang } from '../../domain/types/wiki.types';

export type WikiState = {
  title: string | null;
  extract: string | null;
  option: SessionOption | null;
  isLoading: boolean;
  wikiLang: WikiLang;
};

export const initialState: WikiState = {
  extract: null,
  title: null,
  option: null,
  isLoading: false,
  wikiLang: 'en'
};
