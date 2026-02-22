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

The app follows a 3-layer architecture:

```
src/app/
├── domain/             # Entities, value objects, repository interfaces — no framework deps
├── core/
│   ├── facades/        # NgRx store API exposed to presentation
│   ├── functions/      # Pure utility functions
│   ├── http/           # HTTP repository implementations
│   │   └── constants/  # API URI constants
│   ├── state/          # NgRx: actions, reducers, selectors, effects, states
│   ├── mappers/        # DTO ↔ domain model transformations
│   └── DTOs/           # HTTP response shapes
├── presentation/       # Angular components, pipes, guards
└── testing/            # Shared test utilities — never imported by production code
```

**Layer rules:**
- `domain` defines the contracts (types, repository tokens) — pure TypeScript, no framework dependencies
- `core` contains all non-UI implementation: state management, HTTP, facades, pure functions
- `presentation` uses facades only — never dispatches NgRx actions or accesses state directly

**Dependency direction:** `presentation` → `core/facades` → `core/state`. `domain` is imported by all layers but depends on nothing.

---

### Design Patterns

#### Facade Pattern
Facades live in `core/facades/` and expose a clean API to the presentation layer. Components never interact with the NgRx store directly.

**Naming convention:** all methods returning a `Signal` must be prefixed with `select`. Methods dispatching actions use a verb (`init`, `start`, `reset`, etc.).

```typescript
// src/app/core/facades/session.facade.ts
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
Repository interfaces are defined in `domain/repositories/` as `InjectionToken`. Implementations live in `core/http/`.

```typescript
// domain/repositories/session.repository.ts
export type SessionRepository = { ... };
export const SESSION_REPOSITORY = new InjectionToken<SessionRepository>('SessionRepository');

// app.config.ts — bind implementation to token
{ provide: SESSION_REPOSITORY, useClass: SessionHttpRepository }
```

HTTP repository implementations live in `core/http/` and follow the naming convention `[entity]-http.repository.ts`. They must use `@Injectable()` with no `providedIn`. The token binding in `app.config.ts` is the sole registration point — adding `providedIn: 'root'` creates a redundant second provider.

#### Mapper Pattern
Mappers in `core/mappers/` handle all DTO ↔ domain model transformations. They are pure functions, never classes.

```typescript
// core/mappers/session.mappers.ts
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
// core/state/effects/session.effects.ts
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

Use `actionDispatched()` / `noActionDispatched()` helpers from `core/state/helpers/effects.helpers.ts` — never pass the config object inline.

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
- `output<T>()` — component outputs (replaces `@Output() EventEmitter`)
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

**Dependency injection:**
- Classes (components, services, facades): use constructor injection
- Functional contexts (effects, guards): use `inject()` inside the function body

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

#### No `any`
Never use `any`. Use `unknown` for truly unknown values, or narrow to a specific type.

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
