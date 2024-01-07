import { ActionCreator, ActionReducer, ReducerTypes, createReducer } from '@ngrx/store';

export function createHydrateReducer<S>(
  stateKey: string,
  initialState: S,
  ...ons: ReducerTypes<S, readonly ActionCreator[]>[]
): ActionReducer<S> {
  const hydratedState: S | null = getStoredItem<S>(stateKey);
  return createReducer<S>(hydratedState ?? initialState, ...ons);
}

export function getStoredItem<T>(key: string): T | null {
  try {
    const item: string | null = window.localStorage.getItem(key);
    return (item && JSON.parse(item)) ?? null;
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, item: any): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch {}
}
