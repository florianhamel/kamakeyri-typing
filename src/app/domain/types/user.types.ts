export type Language = 'en' | 'fr';

export type UserInfo = {
  username: string;
  exp: string;
  lang: Language;
};

export type Credentials = {
  username: string;
  password: string;
};

export type UpdateLangDto = {
  username: string;
  lang: Language;
}
