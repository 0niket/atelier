---
description: Quality assurance with automated tests and Human-in-the-Loop verification
---

# Quality Assurance

Verify implementation against specification through automated testing and manual verification.

## Prerequisites

- State file must exist
- All tasks must be complete (state shows: completedTasks = totalTasks)
- Must be on feature branch

## Workflow

### Phase 1: Validate All Tasks Complete

Load state file and check:
```javascript
if (state.workflow.tasks.completedTasks < state.workflow.tasks.totalTasks) {
  ERROR: "Cannot run QA: Tasks incomplete"
  Display: "${completedTasks}/${totalTasks} tasks done"
  Display: "Remaining tasks: [list pending tasks]"
  Suggest: "Run /harness:implement to continue"
  EXIT
}
```

### Phase 2: Automated Test Execution

Run test suite in order:

**1. Unit Tests**:
```bash
# Auto-detect test command from project
# npm test, pytest, go test, cargo test, etc.
```
- Domain model tests (aggregates, entities, VOs)
- Business logic tests
- Collect: pass/fail counts, coverage

**2. Integration Tests**:
- Use cases with repositories
- Service layer tests
- External integrations
- Collect: pass/fail counts

**3. Contract Tests** (if applicable):
- API contract validation
- External service contracts
- Collect: pass/fail counts

**4. E2E/Functional Tests** (if implemented):
- Full user journey tests
- UI automation tests
- Collect: pass/fail counts

**Display results**:
```
═══════════════════════════════════════
Automated Test Results
═══════════════════════════════════════

✅ Unit Tests: 15/15 passed (100%)
✅ Integration Tests: 5/5 passed (100%)
✅ Contract Tests: 3/3 passed (100%)
⚠️  E2E Tests: Not implemented

Overall: 23/23 automated tests passed
Coverage: 95% (from test coverage report)
```

**If any test fails**:
- Display failures with details
- BLOCK QA progression
- Suggest: "Fix failing tests before continuing QA"
- EXIT

### Phase 3: Functional Verification

**Check E2E test coverage**:

**If E2E tests exist and cover all acceptance criteria**:
- Skip manual QA
- Display: "✓ All acceptance criteria covered by E2E tests"
- Go to Phase 4

**If E2E tests missing or incomplete**:
- Determine application type:
  - Web app → Browser-based manual testing
  - API → Request/response verification
  - CLI → Command execution verification
  - Mobile → App interaction testing

**Human-in-the-Loop QA** (for web apps):

1. Load spec acceptance criteria
2. Generate QA script from criteria
3. For each acceptance scenario:

   **Agent provides instructions**:
   ```
   ═══════════════════════════════════════
   Testing: US-1 (P1) - Add Items
   ═══════════════════════════════════════

   Acceptance Criterion: AC-1
   "Given empty cart, When I view it, Then total is $0.00"

   Please execute these steps:
   1. Open http://localhost:3000/cart in your browser
   2. Verify the cart is empty
   3. Check that total displays "$0.00"
   4. Take a screenshot
   5. Paste screenshot below

   Waiting for screenshot...
   ```

   **User provides evidence**:
   - Screenshot image
   - Or text description
   - Or video recording

   **Agent validates**:
   - Analyzes screenshot (vision capability)
   - Checks: Does it match expected outcome from spec?
   - Compares: actual vs. expected from acceptance criteria

   **Pass/Fail determination**:
   - ✅ PASS: Screenshot shows expected outcome
   - ❌ FAIL: Screenshot doesn't match, log issue

4. Save evidence:
   - Create `.harness/specs/<ticket-id>/qa-evidence/`
   - Save screenshot: `<ac-id>-<description>.png`
   - Document in QA report

5. Repeat for ALL acceptance criteria

**Example HITL flow**:
```
Agent: "Testing AC-2: Add item updates total"
Agent: "Steps:"
Agent: "1. Add any product to cart"
Agent: "2. Screenshot the cart page"

User: [pastes screenshot showing cart with 1 item, total $10]

Agent: [Analyzes screenshot with vision]
Agent: ✅ "Verified: Cart shows '1 item, Total: $10.00'"
Agent: "Matches expected: AC-2 PASS"
Agent: ""
Agent: "Next: AC-3 - Add duplicate increments quantity"
Agent: "Steps:"
Agent: "1. Add the same product again"
Agent: "2. Screenshot the cart"

User: [pastes screenshot showing qty: 2, total $20]

Agent: ✅ "Verified: Quantity incremented, total doubled"
Agent: "AC-3 PASS"
```

### Phase 4: Coherence Final Validation

Run final coherence check:

**Spec ↔ Tests**:
- Every acceptance criterion has test? (automated or manual)
- Map AC-1 → test_empty_cart → QA evidence

**Plan ↔ Implementation**:
- Every task from plan implemented?
- Domain model correctly applied?

**Tasks ↔ Code**:
- All tasks marked done in state?
- State machine shows: completedTasks = totalTasks

**Display coherence report**:
```
Coherence Validation
════════════════════

Spec → Plan:
✅ All user stories in plan
✅ All acceptance criteria in plan

Plan → Tasks:
✅ All plan components have tasks
✅ Domain model mapped to tasks

Tasks → Implementation:
✅ All 15 tasks completed (state verified)
✅ Domain model correctly applied

Spec → Tests:
✅ All acceptance criteria tested
  - Automated: 3 criteria
  - Manual QA: 3 criteria
  - Total: 6/6 verified

Violations: None
Status: ✅ FULLY COHERENT
```

**If violations found**:
- Display with severity (blocker/warning)
- If blocker: MUST fix before PR
- If warning: Note in QA report

### Phase 5: QA Report Generation

Create `.harness/specs/<ticket-id>/qa-report.md`:

**Structure**:
```markdown
# QA Report: [Feature Name]

**Ticket**: [URL]
**Branch**: <ticket-id>-<short-desc>
**Date**: <date>
**Tester**: <user>

## Automated Test Results

### Unit Tests
✅ Passed: 15/15
Coverage: 95%

### Integration Tests
✅ Passed: 5/5

### E2E Tests
⚠️ Not implemented (manual QA performed)

## Manual QA Results (Human-in-the-Loop)

### US-1: Add Items (P1)

#### AC-1: Empty cart shows $0.00
**Steps Executed**:
1. Navigated to /cart
2. Verified empty state

**Evidence**: ![AC-1 screenshot](qa-evidence/ac-1-empty-cart.png)

**Result**: ✅ PASS - Total displays "$0.00"

#### AC-2: Add item updates total
**Steps Executed**:
1. Added Product A ($10)
2. Verified cart update

**Evidence**: ![AC-2 screenshot](qa-evidence/ac-2-add-item.png)

**Result**: ✅ PASS - Total shows "$10.00", quantity 1

[... for all acceptance criteria ...]

## Coherence Validation

✅ Spec → Plan: All user stories covered
✅ Plan → Implementation: All tasks completed
✅ Spec → Tests: All acceptance criteria verified
✅ Domain Model: Correctly applied

## Issues Found

1. **Issue**: Currency symbol showing incorrectly
   **Severity**: Minor
   **Fixed**: Updated Money.format() method
   **Status**: ✅ Resolved, retested

## Sign-Off

**QA Status**: ✅ PASS
**Acceptance Criteria**: 6/6 verified
**Test Coverage**: 95%
**Coherence**: Fully aligned

**Approved By**: <user>
**Date**: <date>

Ready for Pull Request
```

### Phase 6: PR Creation (Interactive)

Display QA summary:
```
═══════════════════════════════════════
✅ QA Complete!
═══════════════════════════════════════

Test Results:
- Automated: 23/23 passed
- Manual QA: 6/6 acceptance criteria verified
- Coverage: 95%

Coherence: ✅ Fully aligned
Issues: 1 found, 1 resolved

QA Report: .harness/specs/<ticket-id>/qa-report.md
```

**Ask user**:
```
Create Pull Request? [Y/n]
```

**If Yes**:

1. **Generate PR title**:
   - Format: `feat: <feature-name> (<ticket-id>)`
   - Example: `feat: shopping cart (86c6paqmv)`

2. **Generate PR description**:
   ```markdown
   ## Ticket
   [<ticket-url>](<ticket-url>)

   ## User Stories Implemented
   - ✅ US-1 (P1) 🎯 MVP: Add items to cart
   - ✅ US-2 (P2): Remove items from cart
   - ✅ US-3 (P3): View cart summary

   ## Domain Model
   - **Cart** (Aggregate): Manages cart items with invariants
   - **CartItem** (Entity): Product reference with quantity
   - **Money** (Value Object): Immutable price representation

   ## Test Coverage
   - Unit: 15/15 ✅
   - Integration: 5/5 ✅
   - Manual QA: 6/6 acceptance criteria ✅
   - Coverage: 95%

   ## QA Evidence
   All acceptance criteria manually verified with screenshots.
   See: [QA Report](../.harness/specs/<ticket-id>/qa-report.md)

   ## Coherence Validation
   ✅ Specification → Plan → Tasks → Implementation all aligned
   ✅ Domain model correctly implemented
   ✅ No deviations from plan

   ## Documents
   - Spec: `.harness/specs/<ticket-id>/spec.md`
   - Plan: `.harness/specs/<ticket-id>/plan.md`
   - Tasks: `.harness/specs/<ticket-id>/tasks.md`
   - QA Report: `.harness/specs/<ticket-id>/qa-report.md`
   ```

3. **Create PR**:
   ```bash
   gh pr create \
     --title "feat: <feature-name> (<ticket-id>)" \
     --body "<generated-description>" \
     --base main \
     --head <ticket-id>-<short-desc>
   ```

4. **Display PR info**:
   ```
   ═══════════════════════════════════════
   ✅ Pull Request Created!
   ═══════════════════════════════════════

   PR #123: feat: shopping cart (86c6paqmv)
   URL: https://github.com/owner/repo/pull/123

   The PR includes:
   - User stories summary
   - Domain model overview
   - Test coverage metrics
   - QA evidence and sign-off
   - Links to spec, plan, tasks, QA report

   Branch: <ticket-id>-<short-desc> → main
   ```

**If No**:
- Display: "QA complete. Create PR manually when ready."
- Display: "PR can be created with: gh pr create ..."
- Exit

## Final Output

Whether PR created or not:
```
QA Complete
═══════════════════════════════════════

✓ All automated tests passed
✓ All acceptance criteria verified
✓ QA report generated
✓ Coherence validated

<If PR created>
✓ Pull Request #123 created

State machine archived to: .harness/specs/<ticket-id>/state-archive.json
```

## Notes

- QA is **mandatory** before PR
- Human-in-the-Loop when E2E tests missing
- Screenshots provide evidence for acceptance criteria
- PR creation is **optional** at end (user decides)
- State machine archived after PR created
