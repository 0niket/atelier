# Implementation Plan: [FEATURE NAME]

**Ticket**: [URL]
**Branch**: `<ticket-id>-<short-desc>`
**Spec**: ./spec.md

## Summary

[High-level technical approach to implementing this feature]

## Technical Context

**Language/Version**: [e.g., TypeScript 5.x, Python 3.11]
**Primary Dependencies**: [e.g., React, FastAPI, specific libraries]
**Storage**: [e.g., PostgreSQL, MongoDB, in-memory, N/A]
**Testing**: [e.g., Jest, Pytest, Go test]
**Architecture Pattern**: [e.g., Hexagonal, Clean, Layered]

## Constitution Check

✅ TDD Required: Yes
✅ Domain Modeling: Yes (business logic present)
✅ Refactoring: Yes (continuous during TDD)
✅ Complexity: [trivial/small/medium/large]

## Phase 0: Research (If Needed)

[Resolved [NEEDS CLARIFICATION] markers from spec]

### [Clarification 1]
- **Question**: [From spec]
- **Decision**: [Choice made]
- **Rationale**: [Why this choice]
- **Alternatives Considered**: [Other options and why rejected]

## Phase 1: Domain Model (DDD Tactical Design)

### Bounded Context

**Context Name**: [e.g., Shopping, Ordering, Payment]
**Responsibility**: [What this context handles]
**Dependencies**: [Other contexts, external systems]

### [Aggregate1] (Aggregate Root)

**Invariants** (MUST always hold):
- [Business rule 1]
- [Business rule 2]

**State** (private):
- [field]: [type]

**Commands** (write operations):
- `commandName(params): returnType`
  - Validates: [preconditions]
  - Enforces: [invariant]
  - Emits: [DomainEvent]

**Queries** (read operations):
- `queryName(): Type`

**Domain Events**:
- EventName(payload) - emitted when [trigger]

### [Entity1] (Entity within [Aggregate])

**Identity**: [what makes it unique]

**Attributes**:
- [field]: [type]

**Behavior**:
- `method()`: [what it does]

**Rules**:
- Cannot exist outside [Aggregate]
- [Other constraints]

### [ValueObject1] (Value Object)

**Attributes**:
- [field]: [type]

**Immutability**: Yes

**Operations**:
- `operation()`: [behavior]

**Validation**:
- [Rules]

## Phase 2: Architecture

**Pattern**: [Hexagonal/Clean/Layered]

**Layers**:
- **Domain**: Pure business logic, aggregates, entities, VOs
- **Application**: Use cases, orchestration
- **Infrastructure**: Repositories, external adapters, frameworks

**Testing Strategy**:
- **Unit**: Domain model (aggregates, entities, VOs)
- **Integration**: Use cases with repositories
- **Contract**: External API interactions
- **E2E**: Full user journeys (if applicable)

## Phase 3: Task Breakdown

### Foundation (BLOCKS ALL)

⚠️ CRITICAL: No user story work can begin until foundation complete

- [ ] T001: [Setup task]
- [ ] T002 [P]: [Parallel setup task]

**Checkpoint**: Foundation ready → User stories can begin

---

### US-1: [Title] (P1) 🎯 MVP

**Goal**: [What this delivers]

**Independent Test**: [Verification]

#### Tests (Write FIRST, Ensure FAIL)
- [ ] T003 [P] [US1]: [test description] (covers AC-1)
- [ ] T004 [P] [US1]: [test description] (covers AC-2)

#### Implementation (After Tests FAIL)
- [ ] T005 [US1]: Implement [Component] in [file-path]
  → Domain: [Aggregate/Entity/VO]
  → Makes tests T003, T004 pass

**Checkpoint**: US-1 complete, independently testable, MVP ready

---

### US-2: [Title] (P2)

[Same structure as US-1]

---

### US-3: [Title] (P3)

[Same structure]

---

## Dependencies

### Phase Dependencies
- Foundation (T001-T002) → BLOCKS → All user stories
- User stories can proceed in parallel (if team capacity)
- Or sequential by priority: P1 → P2 → P3

### Within User Story
- Tests MUST be written and FAIL before implementation
- Domain models before services
- Services before endpoints
- Core before integration

## Coherence Map

- US-1 → Tasks [T003-T010]
- AC-1 → Test T004 → Implementation T005
- [Aggregate] → Tasks [T005, T006]
