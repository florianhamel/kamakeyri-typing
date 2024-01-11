export type WikiState = Readonly<{
  title: string | null;
  extract: string | null;
  mode: WikiMode | null;
  isLoading: boolean;
}>;

export type WikiMode = 'search' | 'related' | 'random';

export type WikiData = Readonly<{
  titles: { normalized: string };
  extract: string;
}>;

export type WikiSummary = Readonly<{
  title: string;
  extract: string;
}>;
