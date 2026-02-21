## The application
This is the frontend application of a website for improving your typing skills

## Locations

## Guidelines
### Styling
- Use Tailwind for styling
- Refer to the ```tailwind.config.js``` at the root of the app

---

## Patterns

### Architectural

The app follows a layered DDD architecture. Each layer has strict responsibilities:

```
src/app/
├── domain/         # Entities, value objects, repository interfaces
├── application/    # Facades, pure business logic, helpers
├── infrastructure/ # DTOs, mappers, http/ (repository implementations)
├── presentation/   # Angular components, pipes, guards
├── state/          # NgRx: actions, reducers, selectors, effects, states
└── testing/        # Shared test utilities: factories, mocks — never imported by production code
```

**Layer rules:**
- `domain` defines the contracts (types, repository tokens) — pure TypeScript, no framework dependencies
- `application` contains facades, pure functions and utilities — facades may depend on NgRx Store
- `infrastructure` implements repository interfaces and handles HTTP/DTO mapping
- `presentation` uses facades only — never dispatches actions or calls services directly
- `state` wires everything together through NgRx

**Dependency direction:** `presentation` → `application` (facades) → `state` → `infrastructure` (via DI tokens). `domain` is imported by all layers but depends on nothing.

---

### Design Patterns

#### Facade Pattern
Facades live in `application/facades/` and expose a clean API to the presentation layer. Components never interact with the NgRx store directly.

**Naming convention:** all methods returning a `Signal` must be prefixed with `select`. Methods dispatching actions use a verb (`init`, `start`, `reset`, etc.).

```typescript
// src/app/application/facades/session.facade.ts
@Injectable({ providedIn: 'root' })
export class SessionFacade {
  constructor(private readonly store: Store) {}

  selectSessionChars(): Signal<ReadonlyArray<SessionChar>> {
    return this.store.selectSignal(selectSessionChars);
  }

  init(content: string): void {
    this.store.dispatch(sessionActions.init({ content }));
  }
}
```

#### Repository Pattern
Repository interfaces are defined in `domain/repositories/` as `InjectionToken`. Implementations live in `infrastructure/services/`.

```typescript
// domain/repositories/session.repository.ts
export const SessionRepository = new InjectionToken<SessionRepository>('SessionRepository');

// app.config.ts — bind implementation to token
{ provide: SessionRepository, useClass: SessionService }
```

HTTP repository implementations live in `infrastructure/http/` and follow the naming convention `[entity]-http.repository.ts`. They must use `@Injectable()` with no `providedIn`. The token binding in `app.config.ts` is the sole registration point — adding `providedIn: 'root'` creates a redundant second provider.

#### Mapper Pattern
Mappers in `infrastructure/mappers/` handle all DTO ↔ domain model transformations. They are pure functions, never classes.

```typescript
// infrastructure/mappers/session.mappers.ts
export function toSessionRecord(dto: SessionRecordDTO): SessionRecord {
  return { ...dto, createDate: new Date(dto.createDate) };
}
```

---

### State Management (NgRx)

Each feature slice has its own: `state`, `actions`, `reducer`, `selectors`, `effects`.

#### Actions — `createActionGroup`
```typescript
// state/actions/session.actions.ts
export const sessionActions = createActionGroup({
  source: 'session',
  events: {
    init: props<{ content: string }>(),
    start: emptyProps(),
    update: props<{ event: InputEventSanitized }>(),
  }
});
```

#### Reducers — `createFeature` + pure handler functions
```typescript
// state/reducers/session.reducer.ts
export const sessionFeature = createFeature({
  name: 'session',
  reducer: createReducer(
    initialState,
    on(sessionActions.init, (_, { content }) => init(content)),
    on(sessionActions.update, (state, { event }) => update(state, event))
  )
});

function init(content: string): SessionState { ... }
function update(state: SessionState, event: InputEventSanitized): SessionState { ... }
```

#### Selectors — memoized derived state
```typescript
// state/selectors/session.selectors.ts
export const selectSessionData = createSelector(selectSessionState, (state): SessionData => ({
  time: ...,
  length: state.sessionChars.length,
  keystrokes: state.keystrokes,
  errors: state.errors
}));
```

#### Effects — functional, with helper metadata
```typescript
// state/effects/session.effects.ts
export const sessionLoadAll = createEffect(
  (actions$ = inject(Actions), sessionRepository = inject(SessionRepository)) =>
    actions$.pipe(
      ofType(sessionActions.loadAll),
      switchMap(() =>
        sessionRepository.findAll().pipe(
          map((sessionRecords) => sessionActions.loadAllSuccess({ sessionRecords })),
          catchError(() => of(sessionActions.loadAllError()))
        )
      )
    ),
  actionDispatched()
);
```

Use `actionDispatched()` / `noActionDispatched()` helpers from `state/helpers/effects.helpers.ts` — never pass the config object inline.

**RxJS operator conventions:**
- `switchMap` — cancellable streams (search, load)
- `exhaustMap` — non-cancellable (login, form submit)
- `withLatestFrom` — combine with store selectors
- `ignoreElements` — side-effect-only effects (no action dispatched)

---

### Component Patterns

All components are standalone with `ChangeDetectionStrategy.OnPush`.

```typescript
@Component({
  standalone: true,
  selector: 'kw-session',
  imports: [TranslateModule, NgStyle, FormatSessionCharPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session.component.html'
})
export class SessionComponent { ... }
```

Never import `CommonModule` in standalone components. Import only what the template actually uses: `NgStyle`, `NgClass`, `AsyncPipe`, etc. Angular's new control flow (`@if`, `@for`) requires no import.

**Signals:**
- `input.required<T>()` — required inputs
- `input<T>(default)` — optional inputs
- `signal<T>()` — writable local state
- `computed(() => ...)` — derived state
- `effect(() => ...)` — reactive side effects (use sparingly, prefer facades)

```typescript
export class SessionComponent {
  source = input.required<string>();
  sessionChars = this.sessionFacade.selectSessionChars();

  constructor(private readonly sessionFacade: SessionFacade) {
    effect(() => this.sessionFacade.init(this.source()));
  }
}
```

**Smart vs dumb components:**
- Smart: inject facades, dispatch actions
- Dumb: inputs/outputs only, no injected services

---

### TypeScript Patterns

#### Types over interfaces
Always use `type`, never `interface`.

#### Const objects over enums
```typescript
export const sessionMode = {
  wiki: 'WIKI',
  words: 'WORDS',
  custom: 'CUSTOM'
} as const;

export type SessionMode = (typeof sessionMode)[keyof typeof sessionMode];
```

#### Readonly arrays for immutability
```typescript
sessionChars: ReadonlyArray<SessionChar>
```

#### Type composition via intersection
```typescript
export type Session = SessionData & SessionMetaData;
export type SessionRecord = Session & { createDate: Date };
```

#### Union types for discriminated values
```typescript
export type SessionStatus = 'notStarted' | 'inProgress' | 'closed';
```

#### Immutable array updates
Use `.with()` instead of mutation:
```typescript
const sessionChars = state.sessionChars.with(state.index, updatedChar);
```

---

### Testing Patterns

**Structure: Given / When / Then**
```typescript
it('should initialize session', () => {
  // Given
  const state = initialState;

  // When
  const result = sessionFeature.reducer(state, sessionActions.init({ content: 'Hello' }));

  // Then
  expect(result.sessionChars.length).toBe(5);
});
```

**Reducer tests:** call the reducer directly with initial state and an action.

**Effect tests:** call the functional effect directly, passing mocked `actions$` and services. Use `provideMockStore` with pre-configured selectors.

**Mock data:** use generators from `testing/factories.tools.ts`.

**File convention:** test files live next to the file they test with `.spec.ts` suffix.
