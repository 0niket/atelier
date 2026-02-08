---
description: Break down plan into executable tasks with state machine initialization
---

# Task Breakdown

Generate executable task list from implementation plan and initialize state machine.

## Prerequisites

- Plan must exist: `.harness/specs/<ticket-id>/plan.md`
- Must be on feature branch

## Workflow

### Phase 1: Load Plan

1. Determine feature from current git branch
2. Load plan: `.harness/specs/<branch-name>/plan.md`
3. Extract:
   - Domain model (aggregates, entities, VOs)
   - User stories with priorities
   - Architecture components
   - Testing strategy

### Phase 2: Generate Foundation Tasks

**Foundation Phase** (BLOCKS ALL user stories):

Create tasks for:
- Project setup (if new project)
- Infrastructure (databases, auth, API framework)
- Shared dependencies
- Configuration

Mark ALL foundation tasks as blocking dependencies for user stories.

**Example**:
```markdown
## Foundation (BLOCKS ALL)

⚠️ CRITICAL: No user story work can begin until foundation complete

- [ ] T001: Setup [language] project with [framework]
- [ ] T002 [P]: Configure linting and formatting
- [ ] T003: Initialize database schema
- [ ] T004 [P]: Setup authentication framework

**Checkpoint**: Foundation ready → User stories can begin
```

### Phase 3: Generate User Story Tasks

For EACH user story (P1, P2, P3):

**Tests Section** (write FIRST, must FAIL):
```markdown
### US-1: [Title] (P1) 🎯 MVP

**Goal**: [What this story delivers]

**Independent Test**: [How to verify alone]

#### Tests (Write FIRST, Ensure FAIL)
- [ ] T005 [P] [US1]: test_[scenario1] in tests/[path] (covers AC-1)
- [ ] T006 [P] [US1]: test_[scenario2] in tests/[path] (covers AC-2)
```

**Implementation Section** (after tests FAIL):
```markdown
#### Implementation (After Tests FAIL)
- [ ] T007 [US1]: Implement [Aggregate] in src/domain/[Aggregate].ts
  → Domain: [Aggregate] aggregate root from plan
  → Makes tests T005, T006 pass
  → Invariants: [list from plan]

- [ ] T008 [US1]: Implement [ValueObject] in src/domain/[VO].ts
  → Domain: [VO] value object from plan
  → Used by T007
```

**Checkpoint**:
```markdown
**Checkpoint**: US-1 complete, independently testable, MVP ready
```

### Phase 4: Task Metadata

For each task, include:

- **ID**: T001, T002, T003, ...
- **Markers**:
  - `[P]` - Can run in parallel with siblings
  - `[US#]` - Maps to user story (US1, US2, US3)
- **Spec Reference**: Which acceptance criteria covered (AC-1, AC-2)
- **Domain Elements**: Which aggregates/entities/VOs involved
- **File Path**: Exact implementation location
- **Done Criteria**: Clear completion definition
- **Dependencies**: Which tasks must complete first

### Phase 5: Dependencies & Execution Order

Document dependencies:
```markdown
## Dependencies

### Phase Dependencies
- Foundation (T001-T004) → BLOCKS → All user stories
- US-1 (T005-T010) → Can start after Foundation
- US-2 (T011-T015) → Can start after Foundation (independent of US-1)
- US-3 (T016-T020) → Can start after Foundation (independent of US-1, US-2)

### Within User Story
- Tests MUST be written before implementation
- Tests MUST fail before implementation tasks
- Domain model tasks before service tasks
- Services before endpoints/UI

### Parallel Opportunities
- Foundation tasks marked [P] can run parallel
- All user story tests marked [P] can run parallel
- User stories can be developed in parallel by different team members
```

### Phase 6: Tasks Document

Create `.harness/specs/<ticket-id>-<short-desc>/tasks.md`:

Include:
- Foundation phase
- User story phases (P1, P2, P3)
- Checkpoints
- Dependencies
- Coherence mapping (tasks → spec → plan)

Add header:
```markdown
# Tasks: [Feature Name]

**Spec**: ./spec.md
**Plan**: ./plan.md
**State**: ../../../tmp/<timestamp>-<ticket-id>-<short-desc>.json

**Total Tasks**: [count]
**Foundation**: [count] (BLOCKS ALL)
**US-1 (P1)**: [count] tasks
**US-2 (P2)**: [count] tasks
**US-3 (P3)**: [count] tasks
```

### Phase 7: State Machine Initialization

**Create state file**: `tmp/<timestamp>-<ticket-id>-<short-desc>.json`

**Initialize state**:
1. Parse all tasks from tasks.md
2. Build linked list:
   - T001.nextTask = T002
   - T002.nextTask = T003
   - ...
   - TXX.nextTask = null (last task)
3. Set currentTask = T001 (first task)
4. Set all tasks status = pending
5. Initialize coherence tracking
6. Validate against schema: `${CLAUDE_PLUGIN_ROOT}/schemas/state-machine.yaml`

**State structure**:
```json
{
  "version": "1.0.0",
  "feature": {
    "id": "<ticket-id>-<short-desc>",
    "name": "[Feature Name]",
    "branch": "<ticket-id>-<short-desc>",
    "ticket": {
      "system": "clickup|jira|github|none",
      "id": "<ticket-id>",
      "url": "<ticket-url>"
    }
  },
  "stateFile": {
    "path": "tmp/<timestamp>-<ticket-id>.json",
    "createdAt": "<ISO-8601>",
    "lastUpdated": "<ISO-8601>"
  },
  "currentTask": {
    "id": "T001",
    "status": "pending",
    "phase": "foundation",
    "nextTaskId": "T002"
  },
  "workflow": {
    "spec": {
      "path": ".harness/specs/<ticket-id>/spec.md",
      "exists": true
    },
    "plan": {
      "path": ".harness/specs/<ticket-id>/plan.md",
      "exists": true
    },
    "tasks": {
      "path": ".harness/specs/<ticket-id>/tasks.md",
      "exists": true,
      "totalTasks": 15,
      "completedTasks": 0
    }
  },
  "coherence": {
    "specPlanAlignment": true,
    "planTasksAlignment": true,
    "planImplementationAlignment": true,
    "violations": [],
    "lastCheck": "<ISO-8601>"
  },
  "tasks": {
    "T001": {
      "id": "T001",
      "description": "Setup TypeScript project",
      "status": "pending",
      "userStory": "foundation",
      "nextTask": "T002",
      "previousTask": null,
      "dependencies": [],
      "parallel": false
    },
    ... (all tasks)
  }
}
```

Validate state against schema. Display error if validation fails.

### Final Output

Display:
```
═══════════════════════════════════════
✅ Tasks Created!
═══════════════════════════════════════

Tasks: .harness/specs/<ticket-id>/tasks.md
State: tmp/<timestamp>-<ticket-id>.json (initialized)

Task Summary:
- Foundation: 4 tasks (BLOCKS ALL)
- US-1 (P1) 🎯 MVP: 6 tasks
- US-2 (P2): 3 tasks
- US-3 (P3): 2 tasks
- Total: 15 tasks

State Machine:
✓ Linked list built: T001 → T002 → ... → T015 → null
✓ Current task: T001 (pending)
✓ Schema validated

Execution Order:
1. Foundation (T001-T004) → MUST complete first
2. Then user stories can begin (in priority order or parallel)

Next Steps:
1. Review tasks: .harness/specs/<ticket-id>/tasks.md
2. Start implementation: /harness:implement
```

## Notes

- Tasks organized by user story (Spec-Kit pattern)
- State machine prevents skipping/reordering
- Linked list ensures strict execution order
- Can resume from any point (state preserved)
- Schema validation prevents corruption
