# Development Constitution (Harness Default)

## Branch-Based Workflow (MANDATORY)

### Branch Rules

**NEVER work directly on main branch**. All work MUST happen on feature branches.

**Branch Creation**:
- MUST start with ticket (ClickUp/Jira/GitHub Issue)
- Branch naming: `<ticket-id>-<short-desc>`
  - ClickUp: `86c6paqmv-shopping-cart`
  - Jira: `PROJ-123-shopping-cart`
  - GitHub: `456-shopping-cart`
- MUST create via `/harness:specify` (enforces ticket linking)

**Protected Branches**:
- `main`, `master`, `develop`, `production` are PROTECTED
- CANNOT commit directly to protected branches
- CANNOT push to protected branches
- All changes via Pull Request ONLY

**Branch Workflow**:
1. `/harness:specify` → Creates ticket-based branch, switches to it
2. All work happens on this branch
3. `/harness:qa` → Validates work, offers to create PR
4. After merge → Branch deleted automatically

**Enforcement**:
- Pre-commit hook: BLOCKS commits to protected branches
- Pre-push hook: BLOCKS pushes to protected branches
- State machine: Validates current branch matches feature branch

### Git Workflow Violations (AUTO-BLOCKED)

❌ **BLOCKED**: `git commit` on main branch
❌ **BLOCKED**: `git push origin main` directly
❌ **BLOCKED**: Working without ticket-based branch
❌ **BLOCKED**: Branch name doesn't match pattern
❌ **BLOCKED**: Pushing before QA sign-off

✅ **ALLOWED**: Commits on feature branch
✅ **ALLOWED**: Push feature branch to origin
✅ **ALLOWED**: Create PR after QA passes

---

## Workflow Mandate

All development MUST follow this sequence:

### 1. Specification (BDD/Spec-Kit Inspired)
- **Features**: Start with specification document
  - User stories with scenarios (prioritized P1, P2, P3)
  - Each story independently testable
  - Acceptance criteria (Given-When-Then)
  - Domain concepts identified
  - Edge cases documented

- **Bugs**: Document current vs. desired behavior
  - Reproduction steps
  - Expected vs actual behavior
  - Root cause hypothesis

### 2. Implementation Plan (DDD-Based)
- **Domain Modeling Required** (for business logic):
  - Identify entities, value objects, aggregates
  - Define bounded contexts
  - Create ubiquitous language
  - Model domain events

- **Technical Plan**:
  - Architecture decisions (ADRs if system-level)
  - Component design
  - Integration points
  - Testing strategy

### 3. Task Breakdown
- Break plan into implementable tasks
- Organized by: Foundation (BLOCKS ALL) → User Stories (P1, P2, P3)
- Each task = one aggregate, one component, one refactoring
- Tasks reference plan sections and spec acceptance criteria
- Clear done criteria per task
- Tasks form linked list (T001 → T002 → T003 → ...)

### 4. Implementation (TDD Mandatory)
- **Red-Green-Refactor** for every task:
  - Write test first (Red)
  - Minimal implementation (Green)
  - Refactor to clean (Refactor)
- **State Machine**: Follow task order strictly (linked list)
- **Coherence Check**: Implementation matches plan after each task
- **Plan Deviation**: Update plan FIRST if better approach discovered

### 5. Refactoring (Continuous)
- Apply Fowler's catalog during Refactor phase
- Detect and fix code smells
- Maintain green tests throughout
- Commit atomically per refactoring

### 6. Quality Assurance (Before PR)
- **Automated Testing** MUST run:
  - Unit tests (100% pass required)
  - Integration tests (100% pass required)
  - Contract tests (if external APIs)
  - E2E/Functional tests (if implemented)

- **Manual QA** (Human-in-the-Loop if E2E missing):
  - Generate QA script from acceptance criteria
  - User executes steps (hands and eyes)
  - User provides evidence (screenshots, recordings)
  - Agent validates against expected outcomes
  - Document findings in QA report

- **QA Sign-Off Required**:
  - All acceptance criteria verified (auto or manual)
  - QA report generated with evidence
  - Issues found must be resolved and retested

### 7. Coherence Validation (Continuous)
- **Specification ↔ Plan**: Plan reflects all spec requirements
- **Plan ↔ Tasks**: Tasks cover all plan components
- **Tasks ↔ Implementation**: Code implements all tasks
- **Plan ↔ Tests**: Tests cover all acceptance criteria
- **Plan ↔ QA**: QA verifies all acceptance criteria
- **Flag Drift**: Alert when implementation deviates from plan

---

## State Management (Mandatory)

### Implementation State Machine
- ALL implementation MUST follow state machine
- State file location: `tmp/<timestamp>-<ticket-id>-<short-desc>.json`
- Schema: Enforced by plugin (non-modifiable by users)
- Task execution: Sequential via linked list ONLY
- Current task: Loaded from state, cannot be changed manually

### Deviation Prevention
- Agent CANNOT skip tasks in task list
- Agent CANNOT implement out of order
- Agent CANNOT add unplanned functionality
- State machine blocks non-compliant actions
- Violations logged and reported

### Resumability
- State preserved across sessions
- Agent loads state on resume
- Knows exactly which task to execute next
- Survives context compaction
- No duplicate work, no skipped work

---

## Quality Gates

### Cannot Proceed If:
- ❌ Not on ticket-based feature branch
- ❌ On protected branch (main, master, develop)
- ❌ Specification incomplete (missing acceptance criteria)
- ❌ Plan missing for medium/large features
- ❌ Tasks missing (no tasks.md)
- ❌ State machine not initialized
- ❌ Tests don't exist before implementation (TDD violation)
- ❌ Implementation deviates from plan without plan update
- ❌ Code smells not addressed during refactoring
- ❌ Automated tests failing
- ❌ QA not performed (missing QA report)
- ❌ QA found unresolved issues

### Must Complete Before PR:
- ✅ On correct feature branch (not main)
- ✅ All acceptance criteria tested (unit/integration)
- ✅ All plan tasks implemented (verified via state machine)
- ✅ All automated tests passing
- ✅ **QA performed** (automated + manual if needed)
- ✅ **QA report generated** with evidence
- ✅ **QA sign-off** obtained
- ✅ Code smells addressed or explicitly deferred
- ✅ Coherence validation passed
- ✅ State machine shows: all tasks done

---

## Coherence Rules

### Specification-Plan Coherence
- Every user story in spec MUST have plan section
- Every acceptance criterion MUST have test plan
- Plan cannot introduce features not in spec

### Plan-Tasks Coherence
- Every plan component MUST have corresponding tasks
- Tasks MUST reference plan sections
- Task list MUST cover all user stories (P1, P2, P3)

### Tasks-Implementation Coherence
- Every task MUST have corresponding code/tests
- Implementation cannot add functionality not in tasks
- Deviations require tasks update FIRST (which requires plan update)

### Test-Spec Coherence
- Every acceptance criterion MUST have corresponding test
- Test names reference spec scenarios
- Test coverage report maps to spec requirements
