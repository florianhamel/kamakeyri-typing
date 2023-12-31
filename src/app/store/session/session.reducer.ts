import { createFeature, createReducer, on } from '@ngrx/store';
import { initialized, reset, updated } from '../../utils/session/text.session';
import { sessionActions } from './session.actions';
import { initialState } from './session.state';

export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => initialized(content)),
    on(sessionActions.update, (state, { event }) => updated(state, event)),
    on(sessionActions.reset, (state) => reset(state))
  )
});
