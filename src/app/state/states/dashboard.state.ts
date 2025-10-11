import { Session } from '../../domain/types/session.type';

export type DashboardState = {
  sessions: ReadonlyArray<Session>;
};

export const initState: DashboardState = {
  sessions: []
};
