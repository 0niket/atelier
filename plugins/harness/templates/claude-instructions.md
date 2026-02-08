# Harness Development Workflow

You are working in a repository using the Harness plugin with strict methodology enforcement.

## Branch-Based Workflow (CRITICAL)

### Before ANY Work:
1. **Check current branch**: `git branch --show-current`
2. **NEVER work on main/master/develop/production**
3. If on protected branch: STOP and switch to feature branch
4. Feature branches MUST match pattern: `<ticket-id>-<short-desc>`

### Starting New Work:
1. Use `/harness:specify` to create ticket-based branch
2. Provides ticket URL/ID (ClickUp/Jira/GitHub)
3. Agent creates and switches to correct branch
4. All subsequent work happens on this branch

### Git Operations:
- ✅ ALLOWED: Commit on feature branch
- ✅ ALLOWED: Push feature branch to origin
- ❌ BLOCKED: Commit on main/master
- ❌ BLOCKED: Push to main/master directly
- ✅ ALLOWED: Create PR (via /harness:qa)

---

## Mandatory Workflow

### For Any Work:
1. Check if specification exists (`.harness/specs/<ticket-id>/spec.md`)
2. Check if plan exists (`.harness/specs/<ticket-id>/plan.md`)
3. Check if tasks exist (`.harness/specs/<ticket-id>/tasks.md`)
4. If missing → create in order: spec → plan → tasks
5. Never implement without spec+plan+tasks for medium/large work

### For Implementation:
1. Load specification, plan, and tasks
2. **Load state machine**: `tmp/<timestamp>-<ticket-id>.json`
3. Verify coherence before starting
4. Implement with TDD (Red-Green-Refactor)
5. Follow state machine (execute ONLY currentTask)
6. Apply domain model from plan
7. Validate coherence after each task
8. Update state after each phase
9. Update plan if better approach found

### For Bug Fixes:
1. Document bug specification (current vs. desired)
2. Create minimal plan (root cause + fix approach)
3. Create task list
4. Write failing test reproducing bug
5. Fix with minimal changes
6. Verify coherence with specification
7. Follow state machine

### For Refactoring:
1. Create refactoring specification (smells → clean code)
2. Plan refactoring sequence
3. Ensure tests exist (add if missing)
4. Apply Fowler's catalog one step at a time
5. Commit after each refactoring
6. Maintain coherence with domain model

---

## State Machine Compliance (CRITICAL)

### Before ANY Implementation:
1. Check if state file exists: `tmp/*-<ticket-id>-*.json`
2. If exists: LOAD state and resume from currentTask
3. If missing: Initialize state from tasks.md (run /harness:tasks)
4. NEVER implement without loading state first

### During Implementation:
1. Execute ONLY the task specified in `state.currentTask`
2. Follow TDD cycle per `state.currentTask.tddPhase`:
   - red: Write failing test
   - green: Minimal implementation
   - refactor: Clean up code
3. Update state after each phase transition
4. Validate coherence before marking task done
5. Load next task from `state.tasks[currentTaskId].nextTask`
6. NEVER skip to a different task
7. NEVER implement tasks out of order

### After Compaction:
- Context may be lost, but state file preserves everything
- Reload state file IMMEDIATELY after compaction:
  - Which task you're on: `state.currentTask.id`
  - Which TDD phase: `state.currentTask.tddPhase`
  - What comes next: `state.currentTask.nextTaskId`
- Resume exactly where you were
- Display to user: "Resuming Task T007 (green phase)"

### Deviation Attempts:
If you think a better approach exists:
1. STOP implementation
2. Propose plan update to user
3. Get user approval
4. Update plan.md FIRST
5. Regenerate tasks.md
6. Reinitialize state machine
7. THEN continue with new approach

**NEVER deviate from state machine without plan update and user approval.**

---

## Coherence Checks (Mandatory)

### Before ANY Commit:
- [ ] On feature branch (not main/master)
- [ ] Current task marked done in state
- [ ] Implementation matches plan tasks
- [ ] All acceptance criteria have tests
- [ ] Domain model correctly applied
- [ ] No plan deviations without updates
- [ ] All tests passing
- [ ] State machine coherence: no violations

### During Implementation:
- Validate after each task completion
- Check: Does code match plan design?
- Check: Are domain concepts correctly applied?
- Check: Do tests cover spec acceptance criteria?
- Update coherence status in state file

---

## Constitution Compliance

Enforce these automatically (from `.harness/constitution.md`):
- **Branch-based workflow**: Never on main/master
- **Ticket-driven**: Branch created from ticket
- **TDD for all features**: Tests before code
- **Domain modeling**: For business logic
- **Refactoring**: During Green→Refactor transition
- **Root cause documentation**: For bugs
- **State machine**: Strict task order enforcement
- **Coherence validation**: Continuous
- **QA verification**: Before PR creation

---

## Pre-Commit Checklist

Before every commit, verify:
1. ✅ On feature branch (not protected branch)
2. ✅ Current task complete (state shows done)
3. ✅ Tests passing
4. ✅ Coherence validated
5. ✅ No unplanned code added
6. ✅ State machine updated

If ANY check fails → FIX before committing.

---

## Workflow Commands

**Setup** (once):
- `/harness:setup` - Initialize Harness in repo

**Feature Development** (sequential):
1. `/harness:specify <feature>` - Create BDD spec, ticket-based branch
2. `/harness:plan` - Create DDD plan
3. `/harness:tasks` - Break into executable tasks, init state
4. `/harness:implement` - Execute with TDD + state machine
5. `/harness:qa` - Automated + manual QA, create PR

**Other Jobs**:
- `/harness:bugfix <bug>` - Fix bugs (spec+plan+tasks)
- `/harness:improve <code>` - Refactor systematically
- `/harness:understand <component>` - Learn code
- `/harness:debug <issue>` - Investigate problems
- `/harness:clarify <requirement>` - Refine requirements
- `/harness:constitution` - View/edit rules
