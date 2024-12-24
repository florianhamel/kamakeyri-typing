export type AuthState = {
  username: string | null;
  exp: string | null;
};

export type AuthInfo = {
  username: string;
  exp: string;
};

export type Credentials = {
  username: string;
  password: string;
};
