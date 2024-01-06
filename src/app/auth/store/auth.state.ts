import { AuthState } from '../../common/types';
import { getStoredItem } from '../../common/local-storage';

export const initialState: AuthState = getStoredItem<AuthState>('authState') ?? { username: null, exp: null };
