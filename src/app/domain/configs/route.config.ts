import { Route } from '@angular/router';

export const kwRoute = {
  home: '',
  logIn: 'log-in',
  wiki: 'wiki',
  words: 'words',
  dashboard: 'dashboard'
} as const;

export type KwRoute = Route & { path: (typeof kwRoute)[keyof typeof kwRoute] };
