import { SessionOption } from '../../domain/enums/session-option.enum';

export type WikiState = {
  title: string | null;
  extract: string | null;
  option: SessionOption | null;
  isLoading: boolean;
};

export const initialState: WikiState = {
  extract: null,
  title: null,
  option: null,
  isLoading: false
};
