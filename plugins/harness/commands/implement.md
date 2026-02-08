---
description: Execute tasks with TDD following state machine
---

# Implementation Execution

Execute tasks from task list with Test-Driven Development, following state machine strictly.

## Prerequisites

- Tasks must exist: `.harness/specs/<ticket-id>/tasks.md`
- Must be on feature branch
- State file should exist (created by /harness:tasks)

## Workflow

### Phase 1: State Loading

**Check for state file**:
```bash
# Look for: tmp/*-<ticket-id>-*.json
```

**If state exists**:
- Load state file
- Display resumption info:
  ```
  ═══════════════════════════════════════
  Resuming Implementation
  ═══════════════════════════════════════

  Feature: <feature-name>
  Ticket: <ticket-url>
  Branch: <branch-name>

  Progress: [6/15 tasks complete]
  Current Task: T007 (green phase)
  Description: Implement Money value object

  Last Updated: 2 hours ago
  ```

**If state missing**:
- Run state initialization: `${CLAUDE_PLUGIN_ROOT}/scripts/state-init.js`
- Builds linked list from tasks.md
- Sets currentTask = first task (usually T001)
- Display:
  ```
  State initialized from tasks.md
  Starting with: T001
  ```

**Validate state**:
- Run: `${CLAUDE_PLUGIN_ROOT}/scripts/state-validate.js`
- If invalid: ERROR and display violations
- If valid: Proceed

### Phase 2: Execute Current Task

**Load task details from state**:
```javascript
const task = state.tasks[state.currentTask.id]
// Get: description, filePath, specReference, domainElements, dependencies
```

**Check dependencies**:
- If task has dependencies: Verify all are done
- If blocked: Display blocking tasks and STOP
- If ready: Proceed

**Display task info**:
```
═══════════════════════════════════════
Task T007: Implement Money value object
═══════════════════════════════════════

User Story: US-1 (P1)
Spec Reference: AC-1, AC-2, AC-3
Domain: Money (value object)
File: src/domain/Money.ts
Phase: green (test already written and failing)

Plan Design:
- Immutable value object
- Attributes: amount, currency
- Operations: add(), multiply(), equals()
- Validation: amount >= 0, currency is ISO code
```

**Execute based on TDD phase**:

**If tddPhase = 'red'** (write test):
- Guidance: "Write failing test for this task"
- Reference: spec acceptance criteria
- Use domain terminology from plan
- Test must FAIL before continuing
- After test written: Update state.tddPhase = 'red', verify test fails
- Move to 'green' phase

**If tddPhase = 'green'** (minimal implementation):
- Guidance: "Implement minimal code to make test pass"
- Follow domain model design from plan
- Use aggregate patterns, enforce invariants
- NO premature optimization
- After code written: Run tests
- If passing: Update state.tddPhase = 'refactor'
- If failing: Debug and fix

**If tddPhase = 'refactor'** (clean up):
- Guidance: "Refactor code while keeping tests green"
- Apply Fowler's refactoring catalog if smells detected
- Improve naming, extract methods, remove duplication
- Maintain domain model coherence
- Run tests after each refactoring
- If tests green: Mark task as done

### Phase 3: Task Completion & Coherence

**Validate task completion**:
- [ ] Done criteria met?
- [ ] Tests passing?
- [ ] Spec acceptance criteria covered?
- [ ] Domain model matches plan design?
- [ ] No unplanned functionality added?

**Run coherence check**:
```bash
${CLAUDE_PLUGIN_ROOT}/scripts/coherence-check.js --task <task-id>
```

Validates:
- Implementation matches plan specification
- Tests cover spec acceptance criteria
- Domain elements correctly applied

**If coherence violations**:
- Display violations with severity
- If blocker: MUST fix before proceeding
- If warning: Can proceed but note for later

**Update state**:
```javascript
state.tasks[currentTaskId].status = 'done'
state.tasks[currentTaskId].completedAt = new Date().toISOString()
state.tasks[currentTaskId].tddPhase = 'complete'
state.currentTask = {
  id: state.tasks[currentTaskId].nextTask,
  status: 'pending',
  phase: determinePhase(nextTaskId),
  nextTaskId: state.tasks[nextTaskId].nextTask
}
state.workflow.tasks.completedTasks++
state.coherence.lastCheck = new Date().toISOString()
```

Save state file.

**Commit** (atomic per task):
```bash
git add <files-for-this-task>
git commit -m "feat(<story>): <task-description> (T<id>)

<Details>

Spec: AC-<id>
Domain: <elements>
Task: T<id>/<total>

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"
```

### Phase 4: Move to Next Task

**Load next task**:
```javascript
const nextTaskId = state.currentTask.id
const nextTask = state.tasks[nextTaskId]
```

**If nextTask exists**:
- Display next task info
- Ask: "Continue with next task? [Y/n]"
- If yes: Go to Phase 2 with next task
- If no: Save state and exit (resumable later)

**If nextTask is null** (no more tasks):
- Display:
  ```
  ═══════════════════════════════════════
  ✅ All Tasks Complete!
  ═══════════════════════════════════════

  Completed: 15/15 tasks
  User Stories: US-1 (P1), US-2 (P2), US-3 (P3)

  Next Steps:
  1. Run quality assurance: /harness:qa
  ```
- Exit

### Phase 5: Checkpoints (After Each User Story)

After completing all tasks for a user story:

**Display checkpoint**:
```
═══════════════════════════════════════
🎯 Checkpoint: US-1 (P1) Complete
═══════════════════════════════════════

Tasks Complete: T005-T010
Acceptance Criteria: AC-1, AC-2, AC-3
Domain Model: Cart, CartItem, Money

This user story should be independently testable.

Validate Independently:
1. Run tests for US-1 only
2. Test the feature manually (if web app)
3. Verify it works standalone (MVP test)

Continue to US-2? [Y/n]
```

Checkpoint ensures each story works independently before continuing.

## Resumability

**Session Interrupted**:
- State file preserved in tmp/
- Next session: Run `/harness:implement`
- Agent loads state automatically
- Resumes from exact task and TDD phase

**After Compaction**:
- Agent context cleared
- State file still intact
- Agent reloads state
- Displays: "Resuming Task T007 (refactor phase)"
- Continues without confusion

## State Machine Enforcement

**Agent CANNOT**:
- ❌ Skip tasks (state.currentTask is strict)
- ❌ Implement out of order (linked list enforced)
- ❌ Add unplanned functionality (coherence check blocks)
- ❌ Deviate from domain model (coherence validates)
- ❌ Skip TDD phases (red → green → refactor required)

**Agent MUST**:
- ✅ Load state before starting
- ✅ Execute only currentTask
- ✅ Follow TDD cycle strictly
- ✅ Update state after each phase
- ✅ Validate coherence before marking done
- ✅ Commit after each task

## Notes

- State machine is **strict** - no deviation allowed
- Tasks executed as **linked list** - sequential only
- Each task follows **TDD cycle** - red → green → refactor
- **Coherence validated** continuously
- **Resumable** at any point
- **Compaction-safe** - state survives context loss
