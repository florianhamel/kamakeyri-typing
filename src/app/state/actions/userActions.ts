import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInfo, Credentials, Language } from '../../domain/types/user.types';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    logIn: props<Credentials>(),
    logInSuccess: props<UserInfo>(),
    logInError: emptyProps(),
    reset: emptyProps(),
    updateLang: props<{ username: string, lang: Language }>(),
    updateLangSuccess: props<{ lang: Language }>()
  }
});
