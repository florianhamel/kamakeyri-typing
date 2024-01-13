import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import { Store } from '@ngrx/store';
import { sessionActions } from './session.actions';
import { selectSessionCore } from './session.selectors';
import { selectWikiState } from '../../wiki/store/wiki.selectors';
import { of, tap } from 'rxjs';
import { SessionDto } from '../models/session.types';

// export const sessionUpload = createEffect(
//   (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
//     actions$.pipe(
//       ofType(sessionActions.upload),
//       concatLatestFrom(() => [store.select(selectSessionCore), store.select(selectWikiState)]),
//       tap(([, sessionCore, wikiState]) => {
//         const sessionDto: SessionDto = {
//           ...sessionCore,
//           type: someType,
//           label: wikiState.title ?? undefined,
//           mode: wikiState.mode ?? undefined
//         };
//         sessionService.uploadSession(sessionDto);
//       })
//     );
//     return of();
//   },
//   { functional: true, dispatch: false }
// )
