import { Route } from '@angular/router';

export const routePath = {
  home: '',
  logIn: 'log-in',
  wiki: 'wiki',
  words: 'words',
  dashboard: 'dashboard'
} as const;

export type KwRoute = Route & { path: (typeof routePath)[keyof typeof routePath] };
