---
description: Fix bugs with specification, plan, and TDD
---

# Bug Fix

Fix bugs following the same rigor as features: specification, plan, tasks, TDD implementation.

## User Input

Bug description: "$ARGUMENTS"

## Workflow

### Phase 1: Ticket & Branch

Ask user for bug ticket:
```
Which bug ticket are you fixing?
(ClickUp/Jira/GitHub URL or ID, or press enter for none)
```

Create branch: `<ticket-id>-<short-desc>` or `bugfix-001-<desc>`

Switch to branch.

### Phase 2: Bug Specification

Create `.harness/specs/<ticket-id>/spec.md` for the bug:

**Structure**:
```markdown
# Bug Specification: [Bug Title]

**Ticket**: [URL]
**Branch**: <ticket-id>-<short-desc>
**Type**: Bug Fix

## Current Behavior (Incorrect)

[What's happening now]

**Reproduction Steps**:
1. [Step 1]
2. [Step 2]
3. [Observe incorrect behavior]

## Expected Behavior (Correct)

[What should happen]

## Acceptance Criteria

**Given** [state], **When** [action], **Then** [expected correct behavior]

## Root Cause Hypothesis

[Initial hypothesis of why bug exists]
```

### Phase 3: Root Cause Analysis

Investigate the bug:
1. Examine code related to bug
2. Check recent changes (git log, git blame)
3. Reproduce bug if possible
4. Identify root cause with evidence

Document root cause in plan.

### Phase 4: Fix Plan

Create `.harness/specs/<ticket-id>/plan.md`:

```markdown
# Bug Fix Plan: [Bug Title]

## Root Cause

[Actual cause with evidence]

## Fix Approach

[How to fix - minimal changes]

## Affected Components

- [File/module that needs change]

## Testing Strategy

- Test that reproduces bug (must FAIL before fix)
- Test that verifies fix (must PASS after fix)
- Regression tests (prevent recurrence)

## Domain Model Impact

[If bug reveals domain model issue, note corrections needed]
```

### Phase 5: Tasks & State

Create minimal task list:

```markdown
# Tasks: Bug Fix [Title]

## Foundation
- [ ] T001: Write test reproducing bug (must FAIL)

## Implementation
- [ ] T002: Fix bug with minimal changes (makes T001 PASS)
- [ ] T003: Add regression tests

**Checkpoint**: Bug fixed, tests prevent recurrence
```

Initialize state machine for bug fix.

### Phase 6: TDD Implementation

Follow `/harness:implement` workflow:

**RED**:
- Write test that reproduces bug
- Test MUST fail with bug present

**GREEN**:
- Fix bug with minimal changes
- Test now passes
- Verify no other tests broken

**REFACTOR**:
- Clean up if needed
- Address any code smells introduced

### Phase 7: QA

Run `/harness:qa`:
- Automated tests (including regression test)
- Manual verification of bug fixed
- QA report with evidence

### Final Output

Creates PR (if user confirms) with:
```
fix: <bug-description> (<ticket-id>)

## Bug
[Description]

## Root Cause
[Cause with evidence]

## Fix
[What was changed]

## Testing
- Reproduction test added
- Regression tests added
- All tests passing

## QA
Manual verification: Bug no longer reproducible
```

## Notes

- Bug fixes follow same rigor as features
- Root cause MUST be documented
- Test MUST reproduce bug before fix
- Minimal changes preferred
- Regression prevention critical
