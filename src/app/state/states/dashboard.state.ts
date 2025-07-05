import { Session } from '../../domain/types/session.types';

export type DashboardState = {
  sessions: ReadonlyArray<Session>;
};

export const initState: DashboardState = {
  sessions: []
};
