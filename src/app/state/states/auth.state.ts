export type AuthState = {
  username: string | null;
  exp: string | null;
};

export const initialState: AuthState = {
  username: null,
  exp: null
};
