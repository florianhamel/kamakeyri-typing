import { TypingOption } from './session.types';

export type WikiState = {
  title: string | null;
  extract: string | null;
  option: TypingOption | null;
  isLoading: boolean;
};

export type WikiData = {
  titles: { normalized: string };
  extract: string;
};

export type WikiSummary = {
  title: string;
  extract: string;
};
