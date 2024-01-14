export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  option: WikiOption | null;
  isLoading: boolean;
}>;

export type WikiOption = 'search' | 'related' | 'random';

export type WikiData = Readonly<{
  titles: { normalized: string };
  extract: string;
}>;

export type WikiSummary = Readonly<{
  title: string;
  extract: string;
}>;
