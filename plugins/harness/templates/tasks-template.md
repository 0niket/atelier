# Tasks: [FEATURE NAME]

**Spec**: ./spec.md
**Plan**: ./plan.md
**State**: ../../../tmp/<timestamp>-<ticket-id>-<short-desc>.json

**Total Tasks**: [COUNT]
**Foundation**: [COUNT] (BLOCKS ALL)
**US-1 (P1)**: [COUNT] tasks
**US-2 (P2)**: [COUNT] tasks
**US-3 (P3)**: [COUNT] tasks

## Format: `[ID] [Markers] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: User story mapping (US1, US2, US3)
- File paths must be exact

---

## Foundation (BLOCKS ALL)

⚠️ CRITICAL: No user story work can begin until foundation complete

- [ ] T001: [Foundation task 1]
- [ ] T002 [P]: [Parallel foundation task]

**Checkpoint**: Foundation ready → User stories can begin

---

## US-1: [Title] (P1) 🎯 MVP

**Goal**: [What this story delivers]

**Independent Test**: [How to verify alone]

### Tests (Write FIRST, Ensure FAIL)

- [ ] T003 [P] [US1]: test_[scenario] in tests/[path] (covers AC-1)
- [ ] T004 [P] [US1]: test_[scenario] in tests/[path] (covers AC-2)

### Implementation (After Tests FAIL)

- [ ] T005 [US1]: Implement [Aggregate] in src/domain/[file]
  → Domain: [Aggregate] aggregate root
  → Makes tests T003, T004 pass
  → Invariants: [list]

- [ ] T006 [US1]: Implement [ValueObject] in src/domain/[file]
  → Domain: [VO] value object
  → Used by T005

**Checkpoint**: US-1 complete, independently testable, MVP ready

---

## US-2: [Title] (P2)

[Same structure]

**Checkpoint**: US-1 + US-2 both functional

---

## US-3: [Title] (P3)

[Same structure]

**Checkpoint**: All user stories complete

---

## Dependencies

**Execution Order**:
```
T001, T002 (Foundation)
    ↓
T003, T004, T005, T006 (US1 - some parallel)
    ↓
CHECKPOINT: MVP
    ↓
T007, T008 (US2)
    ↓
CHECKPOINT: US1+US2
    ↓
T009, T010 (US3)
    ↓
CHECKPOINT: Complete
```

**Parallel Opportunities**:
- Foundation tasks marked [P]
- Test tasks marked [P] within same story
- Different user stories (if team capacity)
