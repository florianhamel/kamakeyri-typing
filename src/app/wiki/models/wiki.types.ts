export type WikiState = {
  title: string | null;
  extract: string | null;
  option: WikiOption | null;
  isLoading: boolean;
};

export type WikiOption = 'search' | 'related' | 'random';

export type WikiData = {
  titles: { normalized: string };
  extract: string;
};

export type WikiSummary = {
  title: string;
  extract: string;
};
