export type AuthState = Readonly<{
  username: string | null;
  exp: number | null;
}>;

export type UserInfo = Readonly<{
  username: string;
  exp: number;
}>;

export type Credentials = Readonly<{
  username: string;
  password: string;
}>;

export type Starter = Readonly<{
  key: string;
  code: string;
  shiftKey: boolean;
  value: string;
}>;
