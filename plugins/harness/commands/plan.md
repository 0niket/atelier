---
description: Create DDD-based implementation plan from specification
---

# Implementation Planning

Create a Domain-Driven Design implementation plan from the feature specification.

## Prerequisites

- Specification must exist: `.harness/specs/<ticket-id>/spec.md`
- Must be on feature branch (not main/master)

## Workflow

### Phase 0: Load Specification

1. Determine current feature from git branch
2. Load spec: `.harness/specs/<branch-name>/spec.md`
3. Extract:
   - User stories with priorities
   - Acceptance criteria
   - Preliminary domain concepts
   - Functional requirements
   - `[NEEDS CLARIFICATION]` markers

### Phase 1: Research & Clarifications

For each `[NEEDS CLARIFICATION]` marker:

1. Research the question (use web search, documentation)
2. Present options to user if multiple valid approaches
3. Document decision with rationale
4. Create `research.md` (optional, only if complex clarifications)

**Output**: All uncertainties resolved with documented decisions.

### Phase 2: Domain Modeling (DDD Tactical Design)

**Strategic Design**:
1. Identify bounded contexts
   - What are the distinct domains?
   - Where are context boundaries?
   - Anti-corruption layers needed?

2. Map context relationships
   - Shared kernel, customer-supplier, conformist?

**Tactical Design** (Full aggregate specification):

For each aggregate identified:

**Aggregate Structure**:
```markdown
### <AggregateName> (Aggregate Root)

**Invariants** (MUST always hold):
- [Business rule that cannot be violated]
- [Another invariant]

**State**:
- [field]: [type] (private/public)

**Commands** (write operations):
- `methodName(params): returnType`
  - Validates: [what it checks]
  - Emits: [DomainEvent]
  - Invariant maintained: [which one]

**Queries** (read operations):
- `getX(): Type`

**Domain Events**:
- EventName(payload)
```

For each entity:
```markdown
### <EntityName> (Entity within <Aggregate>)

**Identity**: [what makes it unique]

**Attributes**:
- [field]: [type]

**Behavior**:
- `method()`: [what it does]

**Rules**:
- Cannot exist outside aggregate
- [Other constraints]
```

For each value object:
```markdown
### <ValueObjectName> (Value Object)

**Attributes**:
- [field]: [type]

**Immutability**: Yes

**Operations**:
- `operation()`: [behavior]

**Validation**:
- [Rules that must hold]
```

### Phase 3: Architecture

**Pattern Selection**:
- Hexagonal (Ports & Adapters)
- Clean Architecture
- Layered
- Based on: complexity, team familiarity, domain needs

**Layer Responsibilities**:
- **Domain**: Pure business logic, aggregates, entities, VOs
- **Application**: Use cases, orchestration
- **Infrastructure**: Repositories, external adapters

**Testing Strategy**:
- Unit tests: Domain model (aggregates, entities, VOs)
- Integration tests: Use cases with repositories
- Contract tests: External API interactions
- E2E tests: Full user journeys (if applicable)

**ADRs** (if system-level changes):
- Architecture Decision Records for key choices
- Store in `.harness/docs/adr/`

### Phase 4: Task Breakdown (Organized by User Story)

**Foundation Phase** (BLOCKS ALL user stories):
- Project setup
- Infrastructure
- Shared dependencies
- Mark as blocking

**Per User Story** (P1, P2, P3):

For each story:

**Tests** (write FIRST):
- One task per test group
- Reference spec acceptance criteria
- Mark `[P]` if parallel
- Mark `[US#]` for story mapping

**Implementation** (after tests FAIL):
- One task per aggregate
- One task per value object
- One task per service/use case
- Reference domain model from Phase 2
- Clear file paths
- Done criteria

**Checkpoint**: After each story for independent validation

### Phase 5: Plan Document

Create `.harness/specs/<ticket-id>-<short-desc>/plan.md`:

**Structure**:
```markdown
# Implementation Plan: [Feature]

**Ticket**: [URL]
**Branch**: <ticket-id>-<short-desc>
**Spec**: ./spec.md

## Summary
[High-level approach]

## Technical Context
- Language/Version
- Primary Dependencies
- Storage
- Testing Framework
- Architecture Pattern

## Constitution Check
✅ TDD Required: Yes
✅ Domain Modeling: Yes
✅ Complexity: [trivial/small/medium/large]

## Phase 0: Research (if needed)
[Resolved clarifications]

## Phase 1: Domain Model (DDD Tactical)

### Bounded Context
[Context definition]

### [Aggregate1] (Aggregate Root)
[Full specification]

### [Entity1] (Entity)
[Full specification]

### [ValueObject1] (Value Object)
[Full specification]

## Phase 2: Architecture
[Pattern, layers, integration]

## Phase 3: Task Breakdown

### Foundation (BLOCKS ALL)
- Task list

### US-1: [Title] (P1) 🎯 MVP
#### Tests (FIRST)
- [Test tasks with [P] [US1] markers]
#### Implementation
- [Implementation tasks]
**Checkpoint**: US-1 independently testable

### US-2: [Title] (P2)
[Same structure]

### US-3: [Title] (P3)
[Same structure]

## Dependencies
[Task dependencies and execution order]

## Coherence Map
- US-1 → Tasks [...]
- AC-1 → Test [...] → Implementation [...]
```

### Final Output

Display:
```
═══════════════════════════════════════
✅ Implementation Plan Created!
═══════════════════════════════════════

Plan: .harness/specs/<ticket-id>/plan.md

Domain Model:
- Aggregates: [list]
- Entities: [list]
- Value Objects: [list]

Architecture: [pattern]

Tasks:
- Foundation: [count] tasks
- US-1 (P1): [count] tasks
- US-2 (P2): [count] tasks
- US-3 (P3): [count] tasks
- Total: [count] tasks

Next Steps:
1. Review plan: .harness/specs/<ticket-id>/plan.md
2. Create tasks: /harness:tasks
```

## Notes

- Plan derives from spec (coherence enforced)
- Domain model refined from preliminary concepts in spec
- Tasks organized by user story (Spec-Kit pattern)
- Each user story independently implementable
- Foundation phase clearly marked as blocking
