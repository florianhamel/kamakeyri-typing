import { Language } from '../../domain/types/user.types';

export const userStateKey = 'userState';

export type UserState = {
  username: string | null;
  exp: string | null;
  lang: Language;
};

export const initialState: UserState = {
  username: null,
  exp: null,
  lang: 'en'
};
