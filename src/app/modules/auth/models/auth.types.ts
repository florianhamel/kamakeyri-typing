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
