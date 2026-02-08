# Harness Plugin: Complete Development Harness for Claude Code

## Executive Summary

**Harness** is a comprehensive development workflow plugin that enforces software engineering best practices through a **default constitution** that ships with the plugin. Every repository using Harness gets a constitution that mandates BDD specifications, DDD-based planning, TDD implementation, and systematic refactoring - ensuring **coherence between specification, plan, and implementation**.

**Core Innovation**: The constitution isn't optional or created per-project - it's the **default way of working** that Harness enforces. Projects can customize it, but the methodology framework is built-in.

**Vision**: Transform any repository into a disciplined development environment where specifications drive plans, plans drive implementation, and implementation stays coherent with plans through continuous validation.

---

## The Coherence Problem

### Traditional Development (Broken)
```
Specification (if exists) ────╗
                              ├─→ Implementation (diverges over time)
Plan (if exists) ─────────────╝
```
**Problem**: Specification and plan become stale documentation. Implementation drifts. No coherence checking.

### Harness Approach (Coherent)
```
Specification ─→ Plan ─→ Implementation
       ↑           ↑            ↓
       └───────────┴────────────┘
         Continuous Coherence Validation
```
**Solution**: Every implementation step validated against plan. Every plan change updates implementation. Specification remains living document.

---

## Default Constitution (Ships with Plugin)

When Harness plugin is installed, it creates `.harness/constitution.md` and `CLAUDE.md` with these **mandatory** practices:

### `.harness/constitution.md` (Default)

```markdown
# Development Constitution (Harness Default)

## Branch-Based Workflow (MANDATORY)

### Branch Rules

**NEVER work directly on main branch**. All work MUST happen on feature branches.

**Branch Creation**:
- MUST start with ticket (ClickUp/Jira/GitHub Issue)
- Branch naming: `<ticket-id>-<short-desc>`
  - ClickUp: `<taskId>-<desc>` (e.g., `86c6paqmv-shopping-cart`)
  - Jira: `<issueKey>-<desc>` (e.g., `PROJ-123-shopping-cart`)
  - GitHub: `<number>-<desc>` (e.g., `456-shopping-cart`)
- MUST create via `/harness:specify` (enforces ticket linking)

**Protected Branches**:
- `main`, `master`, `develop`, `production` are PROTECTED
- CANNOT commit directly to protected branches
- CANNOT push to protected branches
- All changes via Pull Request ONLY

**Branch Workflow**:
1. `/harness:specify` → Creates ticket-based branch, switches to it
2. All work happens on this branch
3. `/harness:qa` → Validates work on branch
4. `/harness:review` → Creates PR from branch → main
5. After merge → Branch deleted automatically

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

## Workflow Mandate

All development MUST follow this sequence:

### 1. Specification (BDD/Spec-Kit Inspired)
- **Features**: Start with specification document
  - User stories with scenarios
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
- Each task = one aggregate, one component, one refactoring
- Tasks reference plan sections
- Clear done criteria per task

### 4. Implementation (TDD Mandatory)
- **Red-Green-Refactor** for every task:
  - Write test first (Red)
  - Minimal implementation (Green)
  - Refactor to clean (Refactor)
- **Coherence Check**: Implementation matches plan
- **Plan Deviation**: Update plan if better approach discovered

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
- **Plan ↔ Implementation**: Code implements all plan tasks
- **Plan ↔ Tests**: Tests cover all acceptance criteria
- **Plan ↔ QA**: QA verifies all acceptance criteria
- **Flag Drift**: Alert when implementation deviates from plan

## Quality Gates

### Cannot Proceed If:
- ❌ Specification incomplete (missing acceptance criteria)
- ❌ Plan missing for medium/large features
- ❌ Tests don't exist before implementation (TDD violation)
- ❌ Implementation deviates from plan without plan update
- ❌ Code smells not addressed during refactoring
- ❌ Automated tests failing
- ❌ QA not performed (missing QA report)
- ❌ QA found unresolved issues

### Must Complete Before PR:
- ✅ All acceptance criteria tested (unit/integration)
- ✅ All plan tasks implemented
- ✅ All automated tests passing
- ✅ **QA performed** (automated + manual if needed)
- ✅ **QA report generated** with evidence
- ✅ **QA sign-off** obtained
- ✅ Code smells addressed or explicitly deferred
- ✅ Coherence validation passed
- ✅ Documentation updated

## Coherence Rules

### Specification-Plan Coherence
- Every user story in spec MUST have plan section
- Every acceptance criterion MUST have test plan
- Plan cannot introduce features not in spec

### Plan-Implementation Coherence
- Every plan task MUST have corresponding code/tests
- Implementation cannot add functionality not in plan
- Deviations require plan update first

### Test-Spec Coherence
- Every acceptance criterion MUST have corresponding test
- Test names reference spec scenarios
- Test coverage report maps to spec requirements
```

### `CLAUDE.md` (Default Instructions for Claude)

```markdown
# Claude Development Instructions (Harness)

You are working in a repository using the Harness plugin with strict methodology enforcement.

## Mandatory Workflow

### For Any Work:
1. Check if specification exists (`.harness/specs/<feature>/spec.md`)
2. Check if plan exists (`.harness/specs/<feature>/plan.md`)
3. If missing → create specification first, then plan
4. Never implement without spec+plan for medium/large work

### For Implementation:
1. Load specification and plan
2. Verify coherence before starting
3. Implement with TDD (Red-Green-Refactor)
4. Apply domain model from plan
5. Validate coherence after each task
6. Update plan if better approach found

### For Bug Fixes:
1. Document bug specification (current vs. desired)
2. Create minimal plan (root cause + fix approach)
3. Write failing test reproducing bug
4. Fix with minimal changes
5. Verify coherence with specification

### For Refactoring:
1. Identify code smells
2. Plan refactoring sequence
3. Ensure tests exist (add if missing)
4. Apply Fowler's catalog one step at a time
5. Commit after each refactoring
6. Maintain coherence with domain model

## Coherence Checks (Mandatory)

Before any commit, validate:
- [ ] Implementation matches plan tasks
- [ ] All acceptance criteria have tests
- [ ] Domain model correctly applied
- [ ] No plan deviations without updates
- [ ] All tests passing

## Constitution Compliance

Enforce these automatically (from `.harness/constitution.md`):
- TDD for all features (tests before code)
- Domain modeling for business logic
- Refactoring during Green→Refactor transition
- Root cause documentation for bugs
- Coherence validation continuous
```

---

## Harness Plugin Architecture (Revised)

### 1. Installed Files (Ship with Plugin)

When plugin installed, automatically creates:

```
<project-root>/
├── .harness/
│   ├── constitution.md        # Default constitution (shipped)
│   └── specs/                 # Specifications directory
│       └── .gitkeep
├── CLAUDE.md                  # Default instructions (merged with existing)
└── .harness-version           # Track plugin version
```

**Important**: If `CLAUDE.md` exists, Harness **merges** its instructions at the top. If `.harness/constitution.md` exists, Harness **preserves** it (no overwrite of customizations).

---

### 2. Commands (Jobs-to-be-Done)

#### `/harness:setup`
**Job**: Initialize Harness in repository (run once after plugin install)

**Purpose**: Creates or updates project files with Harness defaults and best practices.

**Workflow**:

**Phase 1: Constitution Setup**
- If `.harness/constitution.md` doesn't exist:
  - Creates it from shipped default template
  - Interactive: Asks about customizations (strict vs flexible TDD, etc.)
- If exists: Preserves it, offers to review/update

**Phase 2: CLAUDE.md Setup**
- If `CLAUDE.md` doesn't exist:
  - Creates it with full Harness instructions
- If exists:
  - **Merges** Harness instructions at top (non-destructive)
  - Adds clear separator: `# Harness Development Workflow`
  - Preserves all existing project instructions

**Phase 3: README.md Update**
- Detects if README exists
- Adds "Development Workflow" section with:
  - Link to `.harness/constitution.md`
  - Available `/harness:*` commands
  - Explanation of spec → plan → implement flow
  - Quick start guide
- **Preserves** all existing README content (non-destructive)

**Phase 4: Directory Structure**
- Creates `.harness/specs/` for specifications
- Creates `.harness/docs/` for domain models and ADRs
- Creates `tmp/` for state files (if doesn't exist)
- Adds `.gitkeep` files

**Phase 5: Gitignore Configuration**
- Checks if `.gitignore` exists
- Adds `tmp/` to gitignore (state files must not be committed)
- Adds `.harness-version` to gitignore
- Preserves existing gitignore content

**Phase 6: Git Hooks Configuration** (optional)
- Offers to configure git hooks for:
  - State machine validation
  - Coherence checking
  - TDD enforcement
- Sets up pre-commit gates

**Outputs**:
- `.harness/constitution.md` (created or preserved)
- `CLAUDE.md` (created or merged)
- `README.md` (updated with workflow section)
- `.harness/specs/` and `.harness/docs/` directories
- `tmp/` directory (for state files)
- `.gitignore` updated (tmp/ added)
- `.harness-version` file (tracks plugin version)

**Example**:
```
/harness:setup

# Interactive prompts:
# ┌─────────────────────────────────────────┐
# │ Harness Setup                           │
# ├─────────────────────────────────────────┤
# │ → Create default constitution? [Y/n]    │
# │ → TDD mode: strict or flexible? [s/f]   │
# │ → Domain modeling: auto or manual? [a/m]│
# │ → Install git hooks? [Y/n]              │
# │ → Update README.md? [Y/n]               │
# └─────────────────────────────────────────┘
#
# Creates:
# ✅ .harness/constitution.md (with chosen settings)
# ✅ CLAUDE.md (Harness instructions merged at top)
# ✅ README.md (Development Workflow section added)
# ✅ .harness/specs/ directory
# ✅ .harness/docs/ directory
# ✅ .harness-version
#
# Next steps displayed:
# 1. Review constitution: .harness/constitution.md
# 2. Read workflow: README.md#development-workflow
# 3. Start first feature: /harness:specify <feature>
```

**Smart Behaviors**:
- **Non-destructive**: Never overwrites existing content
- **Idempotent**: Can be run multiple times safely
- **Preserves customizations**: Existing constitution not replaced
- **Merge-friendly**: CLAUDE.md and README merges don't conflict

**Installation Flow**:
```bash
# 1. Install plugin
claude plugin install harness@atelier -s project

# 2. Run setup
claude
/harness:setup

# 3. Ready to use
/harness:specify Add user authentication
```

---

#### `/harness:constitution`
**Job**: View or customize project constitution

**Workflow**:
- Displays current constitution
- Allows inline editing or customization
- Validates changes don't break coherence requirements
- Updates enforcement rules

**Example**:
```
/harness:constitution

# Or customize specific aspect
/harness:constitution Disable domain modeling for this project
```

**Note**: Usually customized during `/harness:setup` or when changing methodology approach.

---

#### `/harness:specify`
**Job**: Create feature specification (BDD-style, Spec-Kit pattern)

**Workflow**:

**Phase 1: Ticket & Branch** (Ticket-Driven)
- **Asks for ticket**: "Which ticket are you working on? (Provide ClickUp/Jira URL or ID)"
- User provides:
  - ClickUp: URL or task ID (e.g., `86c6paqmv` or full URL)
  - Jira: URL or issue key (e.g., `PROJ-123` or full URL)
  - GitHub Issue: URL or #number
- **Fetches ticket details** (if URL/ID provided):
  - Title
  - Description
  - Acceptance criteria (if present)
  - Status
- **Generates branch name**: `<ticket-id>-<short-desc>`
  - ClickUp: `86c6paqmv-add-shopping-cart`
  - Jira: `PROJ-123-add-shopping-cart`
  - GitHub: `456-add-shopping-cart`
  - No ticket: `feature-001-add-shopping-cart` (fallback to spec-kit numbering)
- **Creates and switches to branch**: `git checkout -b <ticket-id>-<short-desc>`
- **Creates spec directory**: `.harness/specs/<ticket-id>-<short-desc>/`
- **Links ticket**: Stores ticket URL/ID in spec metadata

**Phase 2: User Story Prioritization** (Spec-Kit pattern)
- Interviews developer about feature
- Creates **prioritized** user stories (P1, P2, P3)
- **Critical**: Each story MUST be independently testable
- P1 = MVP (must deliver value alone)
- P2, P3 = Enhancements (optional, additive)

**Phase 3: Acceptance Scenarios** (BDD)
- For each user story: Given-When-Then scenarios
- Each scenario maps to future test
- Identifies edge cases
- Documents business rules

**Phase 4: Domain Concepts** (DDD preliminary)
- Extracts domain concepts from stories
- Identifies aggregates, entities, value objects (preliminary)
- Defines ubiquitous language terms
- Notes domain events

**Phase 5: Requirements & Success Criteria**
- Functional requirements (FR-001, FR-002, ...)
- Success criteria (measurable outcomes)
- Marks uncertainties `[NEEDS CLARIFICATION: ...]` (max 3)

**Phase 6: Specification Document**
- Creates `.harness/specs/###-feature/spec.md`
- Includes: prioritized stories, acceptance scenarios, domain glossary, requirements
- **Structure ensures independent testability**

**Outputs**:
- Specification document (BDD + DDD preliminary)
- Feature branch created: `<ticket-id>-<short-desc>`
- Branch checked out (ready to work)
- Ticket linked in spec metadata

**Example**:
```
/harness:specify Add shopping cart functionality

# Agent asks: "Which ticket are you working on? (ClickUp/Jira URL or ID)"
# User provides: "https://app.clickup.com/t/86c6paqmv"
#
# Agent fetches ticket details from ClickUp
# Creates branch: 86c6paqmv-shopping-cart
# Switches to branch: git checkout -b 86c6paqmv-shopping-cart
# Creates: .harness/specs/86c6paqmv-shopping-cart/spec.md
# Ticket linked in spec header
#
# Spec includes:
# ├── User Story 1: Add Items (P1) 🎯 MVP
# │   - Why P1: Core cart function, delivers value alone
# │   - Independent Test: Can add items and see total
# │   - Given-When-Then scenarios
# ├── User Story 2: Remove Items (P2)
# │   - Why P2: Enhances US-1, but cart works without it
# │   - Independent Test: Can remove items without breaking add
# ├── User Story 3: View Summary (P3)
# │   - Why P3: Nice-to-have, US1+US2 sufficient
# ├── Domain Concepts (Preliminary):
# │   - Cart (aggregate)
# │   - CartItem (entity)
# │   - Money (value object)
# ├── FR-001: No negative quantities
# ├── FR-002: Total = sum of items
# └── [NEEDS CLARIFICATION: Cart persistence mechanism?]
```

---

#### `/harness:plan`
**Job**: Create DDD-based implementation plan from specification

**Workflow** (Spec-Kit structure + DDD modeling):

**Phase 0: Research & Clarifications**
- Loads spec `.harness/specs/###-feature/spec.md`
- Identifies all `[NEEDS CLARIFICATION]` markers
- Researches technical decisions (libraries, patterns, etc.)
- Resolves uncertainties with rationale
- Creates `research.md` (optional, for complex features)

**Phase 1: Domain Modeling** (DDD Tactical Design)
- **From Spec**: Extracts preliminary domain concepts
- **Strategic Design**:
  - Identifies bounded contexts
  - Maps context relationships
  - Defines anti-corruption layers (if external systems)

- **Tactical Design** (Full aggregate design):
  - Cart aggregate: invariants, commands, events
  - CartItem entity: identity, attributes, rules
  - Money value object: immutability, operations
  - Repositories: persistence ports
  - Domain services (if needed)

**Phase 2: Architecture**
- Component design (Hexagonal, Clean, etc.)
- Layer responsibilities (domain, application, infrastructure)
- Integration patterns with external systems
- Testing strategy (unit, integration, contract)
- ADRs for key decisions (if system-level)

**Phase 3: Task Breakdown** (Spec-Kit pattern)
- **Foundation Phase** (BLOCKS ALL): Setup, infrastructure
- **User Story Phases** (by priority):
  - Each US gets own phase (P1, P2, P3)
  - Tasks within story: Tests FIRST, then implementation
  - Tasks marked `[P]` can run parallel
  - Tasks marked `[US#]` map to user stories
- **Checkpoints**: After each story for independent validation

**Phase 4: Coherence Mapping**
- Maps user stories → plan tasks
- Maps acceptance criteria → tests
- Maps domain concepts → code structure
- Creates `coherence-map.json` template

**Phase 5: Plan Document**
- Creates `.harness/specs/###-feature/plan.md`
- Structure:
  - Technical Context
  - Constitution Check
  - Domain Model (full DDD design)
  - Architecture
  - Tasks (organized by Foundation → US1 → US2 → US3)
  - Dependencies (which tasks block which)
  - Coherence map

**Outputs**:
- `plan.md` - Main implementation plan
- `research.md` - Clarifications resolved (if needed)
- `domain-model.md` - Detailed DDD design (optional)
- `coherence-map.json` - Tracking template

**Example**:
```
/harness:plan

# Reads: .harness/specs/001-shopping-cart/spec.md
# Resolves: [NEEDS CLARIFICATION: storage] → in-memory for MVP
#
# Creates: .harness/specs/001-shopping-cart/plan.md
#
# ├── Technical Context:
# │   - TypeScript, Jest, Hexagonal architecture
# ├── Constitution Check:
# │   ✅ TDD required
# │   ✅ Domain modeling (business logic present)
# ├── Domain Model (DDD Tactical):
# │   Cart (aggregate):
# │     Invariants: total = sum, no negatives
# │     Commands: addItem(), removeItem(), clear()
# │     Events: ItemAdded, ItemRemoved
# │   CartItem (entity): productId, quantity, unitPrice
# │   Money (VO): amount, currency, immutable
# ├── Tasks (Spec-Kit organization):
# │   Foundation (T001-T002): Setup TypeScript, Jest
# │   US-1 Add Items (P1) 🎯 MVP:
# │     Tests: T003-T006 [P] (write FIRST, ensure FAIL)
# │     Implementation: T007-T010
# │     Checkpoint: MVP shippable
# │   US-2 Remove Items (P2):
# │     Tests: T011-T012 [P]
# │     Implementation: T013
# │     Checkpoint: US1+US2 shippable
# │   US-3 View Summary (P3):
# │     Tests: T014
# │     Implementation: T015
# └── Coherence Map:
#     US-1 → Tasks [T003-T010]
#     AC "empty cart = $0" → T004 → T008
#     Cart aggregate → T007, T008, T009
```

---

#### `/harness:tasks`
**Job**: Break down plan into executable, trackable tasks

**Purpose**: Generate detailed task list from implementation plan, organized by user story with clear dependencies and parallelization opportunities.

**Workflow** (Spec-Kit pattern):

**Phase 1: Load Plan**
- Reads `.harness/specs/###-feature/plan.md`
- Extracts domain model (aggregates, entities, VOs)
- Identifies user stories from spec (P1, P2, P3)
- Determines architecture and testing strategy

**Phase 2: Task Generation**

**Foundation Tasks** (BLOCKS ALL):
- Project setup (T001, T002, ...)
- Infrastructure required for all stories
- Mark as blocking dependencies

**Per User Story** (P1 → P2 → P3):
- **Tests First** (TDD):
  - Test tasks marked `[P]` (parallel) and `[US#]` (user story)
  - One task per test file/test group
  - Must FAIL before implementation tasks

- **Implementation**:
  - One task per aggregate
  - One task per entity
  - One task per value object
  - One task per service/use case
  - Tasks reference domain model from plan

- **Checkpoint**: After each story for independent validation

**Phase 3: Task Metadata**
Each task includes:
- **ID**: T001, T002, etc.
- **Markers**: `[P]` (parallel), `[US#]` (user story mapping)
- **Spec Reference**: Which acceptance criteria this covers
- **Domain Elements**: Which aggregates/entities involved
- **File Path**: Exact implementation location
- **Done Criteria**: Clear completion definition
- **Dependencies**: What must complete first

**Phase 4: Tasks Document**
- Creates `.harness/specs/###-feature/tasks.md`
- Structure:
  - Foundation Phase (BLOCKS ALL)
  - User Story Phases (P1, P2, P3)
  - Each story has Tests → Implementation → Checkpoint
  - Dependencies clearly marked
  - Parallel opportunities identified

**Phase 5: Task Tracking Integration** (optional)
- Offers to create GitHub Issues from tasks
- Offers to create ClickUp tasks
- Links tasks to spec and plan

**Outputs**:
- `tasks.md` - Complete task breakdown
- Task → Spec → Plan coherence mapping
- Clear execution order (Foundation → US1 → US2 → US3)

**Example**:
```
/harness:tasks

# Reads: .harness/specs/001-shopping-cart/plan.md
# Creates: .harness/specs/001-shopping-cart/tasks.md
#
# ## Foundation (BLOCKS ALL US)
# - [ ] T001: Setup TypeScript project with Jest
# - [ ] T002 [P]: Configure ESLint and Prettier
#
# ## US-1: Add Items (P1) 🎯 MVP
#
# ### Tests (Write FIRST, ensure FAIL)
# - [ ] T003 [P] [US1]: test_money_creation (spec AC-1,2,3)
# - [ ] T004 [P] [US1]: test_empty_cart_zero_total (spec AC-1)
# - [ ] T005 [P] [US1]: test_add_item_to_cart (spec AC-2)
# - [ ] T006 [P] [US1]: test_add_duplicate_increments (spec AC-3)
#
# ### Implementation (After tests FAIL)
# - [ ] T007 [US1]: Implement Money VO in src/domain/Money.ts
#   → Domain: Money value object from plan
#   → Makes T003 pass
#
# - [ ] T008 [US1]: Implement Cart aggregate in src/domain/Cart.ts
#   → Domain: Cart aggregate root from plan
#   → Invariants: total = sum, no negatives
#   → Makes T004, T005, T006 pass
#
# - [ ] T009 [US1]: Implement CartItem entity (refactor from T008)
#   → Domain: CartItem entity from plan
#   → Extracted during Refactor phase
#
# **Checkpoint**: US-1 complete, independently testable, MVP ready
#
# ## US-2: Remove Items (P2)
# [Same pattern...]
#
# ## Dependencies
# T001, T002 → Foundation complete → US-1 can start
# T003-T006 (US1 tests) must FAIL before T007-T009
# T007 (Money) → T008 (Cart uses Money)
# US-1 complete → US-2 can start (independent)
```

---

#### `/harness:implement`
**Job**: Execute tasks from task list with TDD

**Workflow** (TDD + Coherence Enforced):

**Phase 1: Task List Loading & Validation**
- Loads `.harness/specs/###-feature/tasks.md`
- If tasks.md missing → suggests running `/harness:tasks` first
- Validates plan and spec exist
- Displays pending tasks organized by user story
- Shows dependencies and what's blocked
- Checks coherence: tasks cover all plan requirements

**Phase 2: Task-by-Task Implementation**

For each task in plan:

**2a. Domain Setup** (if first task)
- Creates domain model structure per plan
- Establishes aggregates, entities, value objects
- Sets up ubiquitous language in code

**2b. TDD Cycle** (Red-Green-Refactor)
- **RED**: Write failing test
  - Maps to acceptance criteria from spec
  - Uses domain terminology from plan
  - Test name references spec scenario

- **GREEN**: Minimal implementation
  - Implements domain model from plan
  - Follows aggregate design
  - No premature optimization

- **REFACTOR**: Clean up
  - Apply refactoring catalog if smells detected
  - Maintain domain model coherence
  - Keep tests green

**2c. Coherence Check** (after each task)
- ✅ Task implements planned functionality?
- ✅ Tests cover acceptance criteria from spec?
- ✅ Domain model matches plan?
- ✅ No unplanned functionality added?

**Phase 3: Quality Assurance** (Constitution-Enforced)

**3a. Automated Testing**
- Runs full test suite:
  - Unit tests (domain model, aggregates)
  - Integration tests (use cases with repositories)
  - Contract tests (external API interactions)
  - E2E/Functional tests (if implemented)
- Reports coverage and results

**3b. Functional Verification** (if E2E tests missing)
- Generates manual QA script from spec acceptance criteria
- **Human-in-the-Loop QA**:
  - User becomes "hands and eyes"
  - Agent provides step-by-step instructions
  - User executes, provides screenshots/results
  - Agent validates against expected outcomes
  - Continues until all acceptance criteria verified
- Documents QA evidence

**3c. Coherence Final Check**
- All plan tasks completed?
- All spec acceptance criteria verified (automated or manual)?
- Domain model correctly implemented?
- Code smells addressed?

**Phase 4: QA Report & Sign-Off**
- Generates QA report:
  - Test results (automated)
  - QA evidence (manual verification with screenshots)
  - Coherence status
  - Any issues found and resolved
- **Sign-off gate**: Blocks PR creation if QA fails
- Updates task status in plan
- Creates semantic commit with QA reference
- Creates PR with QA report attached

**QA Report Template**:
```markdown
# QA Report: Feature 001 - Shopping Cart

## Automated Test Results
✅ Unit Tests: 15/15 passed
✅ Integration Tests: 5/5 passed
⚠️ E2E Tests: Not implemented (manual QA performed)

## Manual QA Results (Human-in-the-Loop)

### US-1: Add Items (P1)
Tester: @username
Date: 2026-02-08

AC-1: Empty cart shows $0
- Step 1: Navigate to /cart
  Screenshot: ![empty-cart.png]
  Result: ✅ Shows "Cart Total: $0.00"

AC-2: Add item updates total
- Step 1: Click "Add to Cart" on Product A ($10)
  Screenshot: ![add-item.png]
  Result: ✅ Cart shows "1 item, Total: $10.00"

AC-3: Duplicate item increments quantity
- Step 1: Click "Add to Cart" on Product A again
  Screenshot: ![duplicate-item.png]
  Result: ✅ Cart shows "Product A (qty: 2), Total: $20.00"

### US-2: Remove Items (P2)
[Same pattern...]

## Coherence Validation
✅ All user stories implemented per plan
✅ All acceptance criteria verified
✅ Domain model matches plan design
✅ No unplanned functionality added

## Issues Found & Resolved
1. Issue: Cart total displayed with wrong currency symbol
   Fix: Updated Money.format() to use proper locale
   Status: ✅ Resolved and retested

## Sign-Off
✅ Ready for PR
QA Approved by: @developer
Date: 2026-02-08
```

**Example**:
```
/harness:implement

# Loads plan: .harness/specs/001-shopping-cart/plan.md
# Task 1: Implement Cart aggregate
#
# RED: test_empty_cart_has_zero_total()
#   → Test references: Spec AC-1 "Empty cart displays $0.00"
#   → Uses domain terms: Cart, Money
#   → Test fails (no Cart class)
#
# GREEN: class Cart { getTotal() { return Money.zero(); } }
#   → Implements per plan: Cart aggregate with Money VO
#
# REFACTOR: (nothing yet)
#
# Coherence Check:
#   ✅ Task 1 in plan implemented
#   ✅ Spec AC-1 has test
#   ✅ Domain model (Cart, Money) matches plan
#
# Commits: "feat: implement Cart aggregate (Task 1/4)"
#
# Continues to Task 2...
```

---

#### `/harness:bugfix`
**Job**: Fix a bug with specification and plan

**Workflow** (Specification-Driven Bug Fix):

**Phase 1: Bug Specification**
- Creates mini-spec: `.harness/specs/bug-<id>/spec.md`
- Documents:
  - Current behavior (incorrect)
  - Expected behavior (correct)
  - Acceptance criteria for fix
  - Root cause hypothesis

**Phase 2: Fix Plan**
- Creates `.harness/specs/bug-<id>/plan.md`
- Documents:
  - Root cause analysis
  - Fix approach
  - Affected components
  - Testing strategy
  - Regression prevention

**Phase 3: TDD Implementation**
- RED: Write test reproducing bug (from spec)
- GREEN: Fix with minimal changes (per plan)
- REFACTOR: Clean up if smells introduced

**Phase 4: Coherence Validation**
- Fix matches plan approach?
- Test covers spec acceptance criteria?
- Root cause documented matches actual fix?

**Example**:
```
/harness:bugfix Users can't save preferences on mobile

# Creates spec: .harness/specs/bug-042/spec.md
#   Current: Preferences lost when app backgrounds
#   Expected: Preferences persist across sessions
#   AC: User sets dark mode, backgrounds app, returns → still dark mode
#
# Creates plan: .harness/specs/bug-042/plan.md
#   Root Cause: PreferencesService doesn't flush on background
#   Fix: Add flush() in onBackground() lifecycle hook
#   Test: Verify preferences persist after background event
#
# Implementation (TDD):
#   RED: test_preferences_persist_after_background() fails
#   GREEN: Add preferencesService.flush() in onBackground()
#   Test passes
#
# Coherence Check:
#   ✅ Fix matches plan approach (flush on background)
#   ✅ Test covers spec AC
#   ✅ Root cause confirmed
#
# Commits: "fix: persist preferences on background (bug-042)"
```

---

#### `/harness:qa`
**Job**: Quality assurance before PR creation

**Purpose**: Verify implementation against spec through automated tests and human validation.

**Workflow** (Constitution-Enforced QA):

**Phase 1: Automated Test Execution**
- Runs full test suite in order:
  1. **Unit Tests**: Domain model, aggregates, value objects
  2. **Integration Tests**: Use cases, repositories, services
  3. **Contract Tests**: External API interactions
  4. **E2E/Functional Tests**: Full user journeys (if implemented)
- Collects results and coverage metrics
- Identifies any failures immediately

**Phase 2: Functional Verification** (if E2E tests missing or incomplete)

**Determines Test Type**:
- Web app → Browser-based manual testing
- API → API request/response verification
- CLI → Command execution verification
- Mobile app → App interaction testing

**Human-in-the-Loop QA** (for web apps):
1. Loads spec acceptance criteria
2. For each acceptance scenario:
   - Generates step-by-step instructions
   - **User executes**: Follows agent instructions
   - **User provides evidence**: Screenshots, recordings, console output
   - **Agent validates**: Compares against expected outcome from spec
   - **Pass/Fail determination**: Matches spec criteria?
3. Cycles through all acceptance criteria
4. Documents evidence in QA report

**Example HITL Flow**:
```
Agent: "Let's verify AC-1: Empty cart shows $0.00"
Agent: "Step 1: Navigate to http://localhost:3000/cart"
Agent: "What do you see? Please provide a screenshot."

User: [uploads screenshot showing empty cart page]

Agent: [Analyzes screenshot]
Agent: "✅ Verified: Cart total displays '$0.00' as expected"
Agent: "Step 2: Click 'Add to Cart' on any product"
Agent: "What is the cart total now? Screenshot please."

User: [uploads screenshot showing cart with one item]

Agent: [Analyzes - sees total updated correctly]
Agent: "✅ Verified: AC-2 passed - total updated correctly"
```

**Phase 3: Coherence Validation**
- Spec acceptance criteria → QA evidence mapping
- All criteria verified? (automated + manual)
- Domain model behaves as planned?
- No unspecified functionality added?

**Phase 4: QA Report Generation**
- Creates `.harness/specs/###-feature/qa-report.md`:
  - Automated test results
  - Manual QA evidence (screenshots, descriptions)
  - Coherence validation
  - Issues found and resolution
  - Sign-off status
- **Blocks PR if QA fails**

**Phase 5: PR Creation** (Interactive)
- Displays QA summary and sign-off status
- **Asks user**: "QA complete. Create Pull Request? [Y/n]"
- If Yes:
  - Creates PR from feature branch → main
  - PR title: "feat: <feature-name> (<ticket-id>)"
  - PR body includes:
    - Ticket link
    - User stories implemented (P1, P2, P3)
    - Domain model summary
    - Test coverage metrics
    - QA evidence (screenshots, test results)
    - Coherence validation status
  - Links to spec, plan, tasks, QA report
  - Displays PR URL
- If No: Exits, allows user to create PR manually later

**Outputs**:
- QA report with evidence
- Test coverage report
- Screenshots/recordings (for manual QA)
- QA sign-off status
- Pull Request (if user confirms)

**Example**:
```
/harness:qa

# Phase 1: Automated Tests
# Running test suite...
# ✅ Unit tests: 15/15 passed (100%)
# ✅ Integration tests: 5/5 passed
# ⚠️  E2E tests: 0 implemented
#
# Phase 2: Manual QA Required
# No E2E tests found. Starting Human-in-the-Loop QA...
#
# Testing US-1: Add Items (P1)
# ────────────────────────────────
# AC-1: Empty cart shows $0.00
#
# Please execute:
# 1. Open browser to http://localhost:3000
# 2. Navigate to /cart page
# 3. Take screenshot of the empty cart
# 4. Paste screenshot here
#
# [User provides screenshot]
#
# ✅ Verified: Empty cart displays "$0.00"
#
# AC-2: Add item updates total
#
# Please execute:
# 1. Navigate to /products
# 2. Click "Add to Cart" on any product (note the price)
# 3. Go to /cart
# 4. Take screenshot showing cart with item
# 5. Paste screenshot here
#
# [User provides screenshot]
#
# ✅ Verified: Cart shows item with correct total
#
# ... continues for all acceptance criteria ...
#
# Phase 3: Coherence Check
# ✅ All acceptance criteria verified (3 automated + 2 manual)
# ✅ Domain model behaves as planned
# ✅ No unplanned functionality
#
# Phase 4: QA Report
# Creating: .harness/specs/001-shopping-cart/qa-report.md
#
# ═══════════════════════════════════
# ✅ QA PASSED - Ready for PR
# ═══════════════════════════════════
#
# Test Coverage: 100% of acceptance criteria
# Manual QA: 5 screenshots collected
# Issues Found: 1 (formatting) - resolved
#
# Next: /harness:review to create PR
```

---

#### `/harness:improve`
**Job**: Refactor code with specification

**Workflow** (Specification for Refactoring):

**Phase 1: Refactoring Specification**
- Creates `.harness/specs/refactor-<id>/spec.md`
- Documents:
  - Current state (code smells identified)
  - Desired state (clean code without smells)
  - Behavior preservation criteria
  - Acceptance: all tests pass, smells gone

**Phase 2: Refactoring Plan**
- Creates `.harness/specs/refactor-<id>/plan.md`
- Documents:
  - Smells detected (Fowler's catalog)
  - Refactoring sequence (order matters!)
  - Test coverage status
  - Atomic commit strategy

**Phase 3: Systematic Refactoring**
- Ensures test baseline (green)
- For each refactoring in sequence:
  - Apply one transformation
  - Run tests (verify green)
  - Commit (atomic)
- Final verification: smells gone, tests green

**Phase 4: Coherence Validation**
- Behavior preserved? (tests still pass)
- All planned refactorings applied?
- Spec acceptance criteria met? (smells gone)

**Example**:
```
/harness:improve src/OrderProcessor.ts

# Creates spec: .harness/specs/refactor-003/spec.md
#   Current: 150-line method, Feature Envy, Primitive Obsession
#   Desired: Clean, single-responsibility methods
#   AC: All tests pass, no Long Method smell, proper encapsulation
#
# Creates plan: .harness/specs/refactor-003/plan.md
#   Smells: Long Method (calculateTotal), Feature Envy, Primitive Obsession
#   Sequence:
#     1. Extract Method (discount calculation)
#     2. Move Method (to Cart)
#     3. Introduce Parameter Object (OrderContext)
#   Test Status: 85% coverage (sufficient)
#
# Executes plan:
#   Step 1: Extract extractDiscountCalc() → tests → commit
#   Step 2: Move to cart.calculateSubtotal() → tests → commit
#   Step 3: Introduce OrderContext → tests → commit
#
# Coherence Check:
#   ✅ All planned refactorings applied
#   ✅ Spec AC met (smells gone)
#   ✅ Tests all green (behavior preserved)
```

---

#### `/harness:understand`
**Job**: Learn how code works (no spec/plan needed)

**Workflow**:
- Analyzes code structure
- Identifies domain model (if DDD used)
- Generates explanation with diagrams
- No specification or plan required (read-only job)

---


#### `/harness:debug`
**Job**: Debug production issues

**Workflow**: Same as before (investigation → fix with spec/plan)

---

#### `/harness:clarify`
**Job**: Refine vague requirements into specification

**Workflow**:
- Asks clarifying questions
- Creates preliminary specification
- Suggests if `/harness:specify` needed for full spec

---

### 3. Methodology Engines (Auto-Applied by Constitution)

#### Specification Engine (BDD-Inspired)
**Triggered By**: `/harness:specify`, `/harness:bugfix` (for bugs), `/harness:improve` (for refactoring)

**Applies**:
- User story format with scenarios
- Given-When-Then acceptance criteria
- Domain concept extraction
- Edge case identification

**Creates**: `.harness/specs/<feature>/spec.md`

---

#### Domain Modeling Engine (DDD)
**Triggered By**: `/harness:plan` (always - constitution mandates)

**Applies**:
- Strategic Design: Bounded contexts
- Tactical Design: Aggregates, entities, value objects
- Ubiquitous language
- Domain events

**Creates**: Domain model section in plan

---

#### Planning Engine (DDD + Architecture)
**Triggered By**: `/harness:plan`

**Applies**:
- Domain model from spec
- Component design aligned with aggregates
- Architecture patterns (Hexagonal, Clean, etc.)
- Task breakdown mapped to domain model

**Creates**: `.harness/specs/<feature>/plan.md`

---

#### TDD Engine
**Triggered By**: `/harness:implement`, `/harness:bugfix`

**Applies**:
- Red-Green-Refactor cycle
- Test List pattern
- Triangulation, Fake It, etc.
- Emergent design through tests

**Enforces**: Tests before code, minimal implementation, refactor phase

---

#### Refactoring Engine
**Triggered By**: Refactor phase in TDD, `/harness:improve`

**Applies**:
- Code smell detection (Fowler's catalog)
- Refactoring sequencing
- Test safety (before/after each)
- Atomic commits

**Enforces**: Tests stay green, behavior preserved

---

#### Coherence Engine (Continuous)
**Triggered By**: All implementation commands, reviews

**Validates**:
- **Spec ↔ Plan**: Every spec requirement in plan
- **Plan ↔ Implementation**: Every plan task implemented
- **Spec ↔ Tests**: Every acceptance criterion tested
- **Plan ↔ Domain Code**: Domain model correctly applied

**Actions**:
- Alerts on coherence violations
- Blocks commits if major violations
- Suggests plan updates if implementation diverges

---

### 4. Skills (Auto-Invoked)

#### `constitution-enforcer`
**Purpose**: Apply constitution rules automatically
**Triggers**: All commands

#### `coherence-validator`
**Purpose**: Validate spec ↔ plan ↔ implementation alignment
**Triggers**: During implementation, reviews, commits

**Critical Skill**: This is what makes Harness unique - continuous coherence checking

#### `complexity-analyzer`
**Purpose**: Determine if spec/plan required
**Triggers**: Start of any job

**Rules**:
- Trivial: No spec/plan needed
- Small: Inline spec, checklist plan
- Medium: Full spec, structured plan
- Large: Full spec, detailed plan, recommend spec-kit if available

#### `smell-detector`
**Purpose**: Identify refactoring opportunities
**Triggers**: Post-Green phase, `/harness:improve`

#### `domain-analyzer`
**Purpose**: Extract domain concepts from spec
**Triggers**: During specification and planning

#### `test-first-guide`
**Purpose**: Guide TDD cycles
**Triggers**: During implementation

---

### 5. Agents (Specialized)

#### `specifier`
**Specialization**: BDD-style specification creation
**Invoked By**: `/harness:specify`
**Tools**: User story templates, Given-When-Then, domain extraction

#### `domain-modeler`
**Specialization**: DDD modeling
**Invoked By**: Planning engine
**Tools**: Event storming, aggregate design, bounded context mapping

#### `architect`
**Specialization**: Architecture design
**Invoked By**: Planning engine (for system-level)
**Tools**: ADR creation, C4 diagrams, pattern catalog

#### `implementer`
**Specialization**: TDD implementation with coherence checking
**Invoked By**: `/harness:implement`
**Tools**: Test generation, minimal implementation, refactoring, coherence validation

#### `refactoring-coach`
**Specialization**: Systematic refactoring
**Invoked By**: Refactoring engine
**Tools**: Smell detection, Fowler's catalog, test orchestration

#### `qa-engineer`
**Specialization**: Quality assurance and verification
**Invoked By**: `/harness:qa`
**Tools**:
- Test runner orchestration
- Screenshot/evidence analysis (vision capabilities)
- Human-in-the-Loop coordination
- QA script generation from acceptance criteria
- Evidence collection and validation

**Capabilities**:
- Run automated test suites (unit, integration, E2E)
- Generate manual QA scripts from spec
- Guide human tester step-by-step
- Analyze visual evidence (screenshots, recordings)
- Validate results against expected outcomes
- Document QA findings with evidence

#### `reviewer`
**Specialization**: Coherence-focused code review and PR creation
**Invoked By**: `/harness:review`
**Tools**: Spec/plan/code comparison, constitution checking, quality analysis, QA report validation, PR generation

**Capabilities**:
- Load QA report and validate sign-off
- Check coherence across spec/plan/implementation
- Generate PR description with QA evidence
- Link to spec, plan, QA report

#### `investigator`
**Specialization**: Root cause analysis
**Invoked By**: `/harness:debug`, `/harness:bugfix`
**Tools**: Log analysis, git bisect, hypothesis testing

---

### 6. Hooks (Enforcement)

#### `SessionStart`
**Actions**:
- Loads constitution
- Checks for active spec/plan
- Displays coherence status if in-progress work

#### `PreToolUse` - Write|Edit
**Actions**:
- Checks: Is there a plan for this feature?
- Blocks if plan missing for medium/large work
- Validates: Tests written first (TDD compliance)

#### `PostToolUse` - Write|Edit
**Actions**:
- Runs tests automatically
- Detects code smells
- Validates coherence with plan
- Alerts if implementation deviates

#### `PreCommit`
**Actions**:
- **Coherence Gate** (critical):
  - All acceptance criteria tested?
  - All plan tasks completed?
  - Domain model correctly applied?
  - Tests all passing?
- Blocks commit if violations

---

## State Management & Resumability

### The Critical Problem

**Scenario 1: Context Loss on Compaction**
- Long implementation sessions hit context limits
- Conversation compacts, agent loses state
- Agent forgets which task it was on
- Risk: Starts implementing wrong task or deviates from plan

**Scenario 2: Session Interruption**
- Developer needs to close session mid-implementation
- Wants to resume later
- Without state: Agent doesn't know where to continue
- Risk: Duplicate work or skipped tasks

**Scenario 3: Plan Deviation**
- Agent decides to "optimize" and skip planned tasks
- Agent adds unplanned functionality
- Without enforcement: Coherence breaks silently
- Risk: Implementation diverges from spec/plan

### Solution: State Machine

**Core Principle**: State machine enforces strict adherence to task list. Agent cannot deviate. Agent knows exactly where it is and what's next.

### State File Location

**Path**: `tmp/<timestamp>-<ticket-id>-<short-desc>.json` (gitignored)

**Examples**:
- ClickUp: `tmp/20260208-143022-86c6paqmv-shopping-cart.json`
- Jira: `tmp/20260208-143022-PROJ-123-shopping-cart.json`
- GitHub: `tmp/20260208-143022-456-shopping-cart.json`
- No ticket: `tmp/20260208-143022-feature-001-shopping-cart.json`

**Why tmp/**:
- Gitignored automatically (ephemeral state)
- One state file per feature
- Timestamp prevents conflicts
- Cleaned up after PR merged

### State Schema (Enforced by Plugin)

**Schema Definition**: `schemas/state-machine.yaml` (in plugin)

**Users CANNOT modify schema** - plugin validates on every state update.

**State Structure**:
```json
{
  "version": "1.0.0",
  "feature": {
    "id": "86c6paqmv-shopping-cart",
    "name": "Shopping Cart",
    "branch": "86c6paqmv-shopping-cart",
    "ticket": {
      "system": "clickup",
      "id": "86c6paqmv",
      "url": "https://app.clickup.com/t/86c6paqmv"
    }
  },
  "stateFile": {
    "path": "tmp/20260208-143022-001-shopping-cart.json",
    "createdAt": "2026-02-08T14:30:22Z",
    "lastUpdated": "2026-02-08T15:45:10Z"
  },
  "currentTask": {
    "id": "T007",
    "status": "green",
    "phase": "user-story",
    "nextTaskId": "T008"
  },
  "workflow": {
    "spec": {
      "path": ".harness/specs/001-shopping-cart/spec.md",
      "exists": true
    },
    "plan": {
      "path": ".harness/specs/001-shopping-cart/plan.md",
      "exists": true
    },
    "tasks": {
      "path": ".harness/specs/001-shopping-cart/tasks.md",
      "exists": true,
      "totalTasks": 15,
      "completedTasks": 6
    }
  },
  "coherence": {
    "specPlanAlignment": true,
    "planTasksAlignment": true,
    "planImplementationAlignment": true,
    "violations": [],
    "lastCheck": "2026-02-08T15:45:10Z"
  },
  "tasks": {
    "T001": {
      "id": "T001",
      "description": "Setup TypeScript project with Jest",
      "status": "done",
      "userStory": "foundation",
      "nextTask": "T002",
      "previousTask": null,
      "completedAt": "2026-02-08T14:32:00Z"
    },
    "T007": {
      "id": "T007",
      "description": "Implement Money value object",
      "status": "green",
      "userStory": "US-1",
      "tddPhase": "green",
      "specReference": ["AC-1", "AC-2", "AC-3"],
      "domainElements": ["Money"],
      "filePath": "src/domain/Money.ts",
      "nextTask": "T008",
      "previousTask": "T006",
      "dependencies": ["T003"],
      "parallel": false
    }
  }
}
```

### State Machine Workflow

**Simple Linked List**:
```
T001 → T002 → T003 → T004 → T005 → ... → null
  ↑                            ↑
Foundation                  US-1 Tests
```

**State Transitions**:
```
Task Status Flow:
pending → in-progress → (TDD cycle) → done → next task

TDD Cycle Within Task:
in-progress → red → green → refactor → done
```

**Agent Actions** (enforced by state machine):
1. **Prepare**: Load current task from state, verify dependencies met
2. **Execute**: Follow TDD cycle (red → green → refactor)
3. **Validate**: Check against plan, update state
4. **Mark Done**: Update task status, move to next
5. **Repeat**: Load next task from linked list

**Agent CANNOT**:
- ❌ Skip tasks
- ❌ Implement tasks out of order
- ❌ Add unplanned tasks
- ❌ Deviate from domain model
- ❌ Skip TDD phases

### State Enforcement Mechanisms

#### 1. Constitution (`.harness/constitution.md`)

Added section:
```markdown
## State Management (Mandatory)

### Implementation State Machine
- ALL implementation MUST follow state machine
- State file location: `tmp/<timestamp>-<feature-id>.json`
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
- No duplicate work, no skipped work
```

#### 2. CLAUDE.md Instructions

Added section:
```markdown
## State Machine Compliance (CRITICAL)

### Before ANY Implementation:
1. Check if state file exists: `tmp/*-<feature-id>.json`
2. If exists: LOAD state and resume from currentTask
3. If missing: Initialize state from tasks.md
4. NEVER implement without loading state first

### During Implementation:
1. Execute ONLY the task specified in state.currentTask
2. Follow TDD cycle per state.currentTask.tddPhase
3. Update state after each phase (red → green → refactor)
4. Validate coherence before marking task done
5. Load next task from state.tasks[currentTaskId].nextTask
6. NEVER skip to a different task

### After Compaction:
- Context may be lost, but state file preserves:
  - Which task you're on
  - Which TDD phase (red/green/refactor)
  - What comes next
- Reload state file IMMEDIATELY after compaction
- Resume exactly where you were

### Deviation Attempts:
If you think a better approach exists:
1. STOP implementation
2. Propose plan update
3. Get user approval
4. Update plan.md FIRST
5. Regenerate tasks.md
6. Reinitialize state
7. THEN continue with new approach

NEVER deviate from state machine without plan update.
```

#### 3. README.md Addition

```markdown
## State Management

Harness uses a state machine to ensure implementation stays on track:

- **State files**: `tmp/<timestamp>-<feature-id>.json` (gitignored)
- **Purpose**: Track current task, TDD phase, coherence status
- **Resumability**: Close session anytime, resume exactly where you left off
- **Compaction-safe**: Agent reloads state after context compaction
- **Deviation-proof**: Agent cannot skip tasks or implement out of order

**Note**: State files are temporary and gitignored. They're deleted after PR merge.
```

#### 4. Hooks (Enforcement)

**`SessionStart` Hook**:
```javascript
// Check for active state files
const stateFiles = glob('tmp/*-*.json')
if (stateFiles.length > 0) {
  // Display active features
  console.log('Active features with state:')
  stateFiles.forEach(file => {
    const state = JSON.parse(readFile(file))
    console.log(`  ${state.feature.id}: Task ${state.currentTask.id} (${state.currentTask.status})`)
  })
}
```

**`PreToolUse` Hook - Write|Edit**:
```javascript
// Before writing code, validate state machine
const state = loadCurrentState()
if (!state) {
  ERROR: "No state file found. Run /harness:implement to initialize state."
}

// Check if implementing correct task
if (tool.file_path !== state.tasks[state.currentTask.id].filePath) {
  BLOCK: "State machine violation: Current task is ${state.currentTask.id}, but you're writing to wrong file."
  SUGGEST: "Expected: ${state.tasks[state.currentTask.id].filePath}"
}

// Check TDD phase
if (state.currentTask.tddPhase === 'red' && tool.name !== 'Write' to test file) {
  BLOCK: "TDD violation: Must write test first (RED phase). Current task needs test."
}
```

**`PostToolUse` Hook - Write|Edit**:
```javascript
// After writing, update state
const state = loadCurrentState()

// Detect TDD phase completion
if (testsJustWritten) {
  state.currentTask.tddPhase = 'red'
  state.currentTask.status = 'red'
}
if (testsNowPassing && state.currentTask.tddPhase === 'red') {
  state.currentTask.tddPhase = 'green'
}
if (refactoringApplied && state.currentTask.tddPhase === 'green') {
  state.currentTask.tddPhase = 'refactor'
}

// Save state
saveState(state)
```

**`PreCommit` Hook**:
```javascript
// Before commit, validate current task complete
const state = loadCurrentState()

if (state.currentTask.status !== 'done') {
  BLOCK: "Cannot commit: Current task ${state.currentTask.id} not marked done."
  SUGGEST: "Complete task or mark as done in state."
}

// Validate coherence
if (state.coherence.violations.some(v => v.severity === 'blocker')) {
  BLOCK: "Cannot commit: Coherence violations present."
  DISPLAY: state.coherence.violations
}
```

#### 5. Scripts (State Management)

**`scripts/state-init.js`** - Initialize state from tasks.md:
```javascript
// Parse tasks.md
// Build linked list (T001 → T002 → T003 → ...)
// Create state file in tmp/
// Validate schema
```

**`scripts/state-update.js`** - Update state after task completion:
```javascript
// Load state
// Mark current task done
// Move to next task in linked list
// Update coherence status
// Validate schema
// Save state
```

**`scripts/state-validate.js`** - Validate state schema:
```javascript
// Load state file
// Load schema YAML
// Validate JSON against schema
// Report violations
// Exit code 1 if invalid
```

**`scripts/state-resume.js`** - Resume from state:
```javascript
// Load state file
// Display current position
// Show current task details
// Show next tasks in queue
// Validate coherence before resuming
```

### State Machine Integration in Commands

#### Updated `/harness:tasks`
Now includes state initialization:
```markdown
**Phase 6: State Initialization**
- Creates state file: `tmp/<timestamp>-<feature-id>.json`
- Builds linked list from tasks
- Sets currentTask = T001 (first task)
- Initializes coherence tracking
- References state file path in tasks.md header
```

#### Updated `/harness:implement`
Now state-driven:
```markdown
**Phase 1: State Loading**
- Checks for state file in tmp/
- If exists: Resume from currentTask
- If missing: Initialize from tasks.md
- Validates state schema
- Displays: "Resuming Task T007 (green phase)"

**Phase 2: Execute Current Task ONLY**
- Loads task details from state
- Follows TDD cycle per tddPhase
- Updates state after each phase
- Cannot deviate to different task

**Phase 3: Task Completion**
- Validates task done criteria met
- Marks task as done in state
- Moves to next task via linked list
- Updates coherence status

**Phase 4: Repeat**
- Loads next task from state.currentTask.nextTaskId
- If null: All tasks complete → proceed to QA
```

#### Updated `/harness:qa`
State-aware:
```markdown
**Prerequisites**:
- State file must show: all tasks complete
- If incomplete tasks: BLOCK and show remaining
```

### State Machine in Action

```bash
# Step 1: Create tasks
/harness:tasks
# Creates: .harness/specs/001-shopping-cart/tasks.md
# Initializes: tmp/20260208-143022-001-shopping-cart.json
# State: currentTask = T001, status = pending

# Step 2: Start implementation
/harness:implement

# State machine:
# → Loads state
# → Current task: T001 (Setup TypeScript)
# → Executes T001
# → Marks done, moves to T002
# → Current task: T002 (Configure linting)
# → Executes T002
# → Marks done, moves to T003
# → Current task: T003 (test_money_creation - RED phase)
# → Status: red, waiting for test to be written
#
# [Developer closes session]

# Next day: Resume
/harness:implement

# State machine:
# → Loads state from tmp/20260208-143022-001-shopping-cart.json
# → Displays: "Resuming Task T003 (RED phase - write failing test)"
# → Continues exactly where left off
# → No confusion, no duplicate work

# After compaction mid-session:
# Agent context cleared by compaction
# BUT state file preserved
# Agent loads state: "I'm on Task T007, GREEN phase, implementing Money VO"
# Continues correctly
```

### State Enforcement via Hooks

**Prevents**:
1. ❌ Skipping tasks (hook checks currentTask before Write)
2. ❌ Wrong file edits (hook validates filePath matches state)
3. ❌ TDD violations (hook enforces red → green → refactor)
4. ❌ Out-of-order execution (linked list is strict)
5. ❌ Unplanned code (coherence check on every update)

**Enables**:
1. ✅ Perfect resumability (load state, continue)
2. ✅ Compaction safety (state survives context loss)
3. ✅ Multi-session work (close anytime, resume later)
4. ✅ Coherence enforcement (automatic validation)
5. ✅ Progress tracking (know exactly where you are)

### State File Lifecycle

```
/harness:tasks
  ↓
State Created (tmp/<timestamp>-<feature>.json)
  ↓
/harness:implement
  ↓
State Updated (each task, each TDD phase)
  ↓
[Session closed - state preserved]
  ↓
/harness:implement (next session)
  ↓
State Loaded (resume exact position)
  ↓
Continue until all tasks done
  ↓
/harness:qa
  ↓
State shows: all tasks complete
  ↓
/harness:review (PR created)
  ↓
State Archived or Deleted
```

### Coherence Validation via State

State machine tracks:
- **Spec ↔ Tasks**: Every acceptance criterion has task
- **Tasks ↔ Implementation**: Every task done = code exists
- **Plan ↔ Implementation**: Domain model correctly applied
- **Violations**: Logged with severity (blocker/warning)

**Coherence Gate**:
```javascript
// Before marking task done
function validateTaskCoherence(taskId, state) {
  const task = state.tasks[taskId]

  // Check spec coverage
  if (task.specReference.length > 0) {
    for (const ac of task.specReference) {
      if (!testExists(ac)) {
        return {
          valid: false,
          violation: `Task ${taskId} claims to cover ${ac} but no test found`
        }
      }
    }
  }

  // Check domain model
  if (task.domainElements.length > 0) {
    for (const element of task.domainElements) {
      if (!codeMatchesPlanDesign(element)) {
        return {
          valid: false,
          violation: `Domain element ${element} doesn't match plan design`
        }
      }
    }
  }

  return { valid: true }
}
```

---

## Implementation Phases

### Phase 1: Constitution & Specification
**Deliverables**:
- Default constitution (ships with plugin)
- Default CLAUDE.md (ships with plugin)
- `/harness:constitution` command
- `/harness:specify` command (BDD specification)
- `specifier` agent
- `constitution-enforcer` skill

**Success Criteria**:
- Constitution auto-installed with plugin
- Can create BDD-style specifications
- Specifications enforce Given-When-Then format

---

### Phase 2: Planning & Domain Modeling
**Deliverables**:
- `/harness:plan` command (DDD-based planning)
- Domain modeling engine
- Planning engine
- `domain-modeler` agent
- `domain-analyzer` skill

**Success Criteria**:
- Can create DDD-based plans from specs
- Plans include domain models (aggregates, entities, VOs)
- Plans break down into coherent tasks

---

### Phase 3: TDD Implementation & Coherence
**Deliverables**:
- `/harness:implement` command (TDD execution)
- TDD engine
- Coherence engine
- `implementer` agent
- `test-first-guide` skill
- `coherence-validator` skill

**Success Criteria**:
- Implementation follows plan strictly
- TDD enforced (Red-Green-Refactor)
- Coherence validated continuously
- Alerts on plan deviations

---

### Phase 4: Refactoring & Quality
**Deliverables**:
- `/harness:improve` command
- `/harness:review` command
- Refactoring engine
- `refactoring-coach` agent
- `reviewer` agent
- `smell-detector` skill

**Success Criteria**:
- Refactoring has spec and plan
- Fowler's catalog applied systematically
- Reviews check coherence
- Quality enforced through constitution

---

### Phase 5: Debugging & Understanding
**Deliverables**:
- `/harness:bugfix` command (with spec/plan)
- `/harness:debug` command
- `/harness:understand` command
- `/harness:clarify` command
- `investigator` agent

**Success Criteria**:
- Bug fixes have specifications
- Debugging systematic with root cause docs
- Understanding explains domain models

---

### Phase 6: Automation & Hooks
**Deliverables**:
- All hooks (SessionStart, PreToolUse, PostToolUse, PreCommit)
- Automatic coherence checking
- Git workflow integration

**Success Criteria**:
- Coherence validated automatically
- Constitution enforced without developer intervention
- Seamless workflow integration

---

## Coherence Architecture

### The Coherence Map

Every feature has a coherence map tracking alignment:

```
.harness/specs/001-shopping-cart/
├── spec.md                    # Source of truth
├── plan.md                    # Derived from spec
├── coherence-map.json         # Auto-generated tracking
└── domain-model.md            # Domain design

coherence-map.json:
{
  "spec": {
    "userStories": [
      {
        "id": "US-1",
        "description": "Add item to cart",
        "acceptanceCriteria": ["AC-1", "AC-2"],
        "planTasks": ["Task-1", "Task-2"],
        "tests": ["test_add_item_to_cart", "test_duplicate_items"],
        "implemented": true,
        "coherent": true
      }
    ]
  },
  "plan": {
    "tasks": [
      {
        "id": "Task-1",
        "description": "Implement Cart aggregate",
        "specReference": "US-1",
        "domainModel": ["Cart", "CartItem", "Money"],
        "tests": ["test_add_item_to_cart"],
        "implemented": true,
        "coherent": true
      }
    ]
  },
  "coherenceStatus": "ALIGNED",
  "violations": []
}
```

### Coherence Validation Rules

**Rule 1: Specification Completeness**
- Every user story MUST have acceptance criteria
- Every acceptance criterion MUST be testable
- Domain concepts MUST be defined in glossary

**Rule 2: Plan-Spec Alignment**
- Every spec user story MUST map to plan tasks
- Every acceptance criterion MUST have test plan
- Plan domain model MUST include all spec domain concepts

**Rule 3: Implementation-Plan Alignment**
- Every plan task MUST have implementation
- Every test plan MUST have actual tests
- Domain model in code MUST match plan design

**Rule 4: Deviation Management**
- Implementation deviation → update plan FIRST
- Plan deviation → update spec FIRST
- Breaking coherence → red flag in reviews

---

## Complete Workflow Example

### Feature: Add Shopping Cart

```bash
# Step 1: Specify
/harness:specify Add shopping cart with add/remove items

# Creates:
# .harness/specs/001-shopping-cart/spec.md
# ├── User Stories:
# │   US-1: As a shopper, I can add items to cart
# │   US-2: As a shopper, I can remove items from cart
# │   US-3: As a shopper, I can see cart total
# ├── Acceptance Criteria (Given-When-Then):
# │   AC-1: Given empty cart, When I view it, Then total is $0.00
# │   AC-2: Given empty cart, When I add item($10), Then total is $10.00
# │   AC-3: Given cart with item($10), When I remove it, Then total is $0.00
# ├── Domain Concepts:
# │   - Cart (container for items)
# │   - CartItem (product + quantity)
# │   - Money (price representation)
# └── Edge Cases:
#     - Negative quantities
#     - Duplicate items
#     - Remove non-existent items

# Step 2: Plan (DDD-based)
/harness:plan

# Creates:
# .harness/specs/001-shopping-cart/plan.md
# ├── Domain Model:
# │   Cart (aggregate root):
# │     - Invariants: total = sum(items), no negative quantities
# │     - addItem(product, quantity)
# │     - removeItem(productId)
# │     - getTotal() → Money
# │   CartItem (entity within Cart):
# │     - Identity: productId
# │     - Attributes: quantity, unitPrice
# │   Money (value object):
# │     - Immutable
# │     - Value: amount, currency
# ├── Architecture:
# │   - Hexagonal: CartService (use case), CartRepository (port)
# │   - Domain layer: Pure business logic
# ├── Tasks:
# │   Task-1: Implement Money value object
# │     → Tests: AC-1, AC-2, AC-3
# │     → Domain: Money
# │   Task-2: Implement Cart aggregate
# │     → Tests: AC-1, AC-2, AC-3
# │     → Domain: Cart, CartItem
# │   Task-3: Implement CartRepository
# │     → Tests: Persistence tests
# │   Task-4: Implement CartService
# │     → Tests: Integration tests
# └── Coherence Map: US-1 → Task-2, AC-1 → test_empty_cart, etc.

# Step 3: Create Tasks
/harness:tasks

# Reads: .harness/specs/001-shopping-cart/plan.md
# Creates: .harness/specs/001-shopping-cart/tasks.md
#
# ## Foundation (BLOCKS ALL)
# - [ ] T001: Setup TypeScript + Jest
# - [ ] T002 [P]: Configure linting
#
# ## US-1: Add Items (P1) 🎯 MVP
# ### Tests (FIRST, must FAIL)
# - [ ] T003 [P] [US1]: test_money_creation
# - [ ] T004 [P] [US1]: test_empty_cart_zero
# - [ ] T005 [P] [US1]: test_add_item
# - [ ] T006 [P] [US1]: test_duplicate_increments
# ### Implementation (After tests FAIL)
# - [ ] T007 [US1]: Money VO (makes T003 pass)
# - [ ] T008 [US1]: Cart aggregate (makes T004-T006 pass)
# - [ ] T009 [US1]: CartItem entity (refactor from T008)
# **Checkpoint**: MVP ready
#
# ## US-2: Remove Items (P2)
# [Tasks T010-T013]
# **Checkpoint**: US1+US2 ready
#
# ## US-3: View Summary (P3)
# [Tasks T014-T015]

# Step 4: Implement (Execute Tasks)
/harness:implement

# Loads tasks: .harness/specs/001-shopping-cart/tasks.md

# Executes Task 1: Money value object
#
# RED: test_money_creation()
#   → References: AC-1 from spec
#   → Domain: Money (from plan)
#   → Fails (no Money class)
#
# GREEN: class Money { constructor(amount) { this.amount = amount; } }
#
# REFACTOR: Make immutable, add currency
#
# Coherence Check:
#   ✅ Task-1 progress: Money class created
#   ✅ Matches plan design: Money is value object
#   ✅ Test references spec AC-1
#
# Commits: "feat(cart): implement Money value object (Task 1/4, AC-1)"
#
# Executes Task 2: Cart aggregate
#
# RED: test_empty_cart_has_zero_total()
#   → References: AC-1 exactly from spec
#   → Domain: Cart aggregate from plan
#   → Uses: Money VO (Task 1)
#   → Fails (no Cart class)
#
# GREEN: class Cart { getTotal() { return Money.zero(); } }
#
# REFACTOR: (nothing yet)
#
# RED: test_add_item_increases_total()
#   → References: AC-2 from spec
#   → Fails (addItem not implemented)
#
# GREEN: Implement addItem() with items array
#   → Applies plan: CartItem entity with productId
#   → Enforces invariant: no negative quantities
#
# REFACTOR: Extract calculation method if smell detected
#
# Coherence Check after Task 2:
#   ✅ Task-2 complete: Cart aggregate implemented
#   ✅ Domain model matches plan (Cart, CartItem)
#   ✅ AC-1, AC-2 tested
#   ⚠️  AC-3 pending (removeItem) → shows progress
#
# Continues for Tasks 3, 4...
#
# Final Coherence Validation:
#   ✅ All 4 tasks from plan implemented
#   ✅ All 3 acceptance criteria from spec tested
#   ✅ Domain model (Cart, CartItem, Money) correctly applied
#   ✅ All tests passing (100% of acceptance criteria)
#
# Continues for Tasks 3, 4...
#
# Final Implementation Status:
#   ✅ All 4 tasks from plan implemented
#   ✅ All tests passing
#   ✅ Domain model correctly applied

# Step 4: Quality Assurance
/harness:qa

# Phase 1: Automated Tests
# ──────────────────────────
# Running test suite...
# ✅ Unit tests: 15/15 passed
#   - Money VO: 3/3
#   - Cart aggregate: 8/8
#   - CartItem entity: 4/4
# ✅ Integration tests: 5/5 passed
# ❌ E2E tests: Not implemented
#
# Phase 2: Manual QA (Human-in-the-Loop)
# ──────────────────────────────────────
# E2E tests missing. Starting manual verification...
#
# Testing US-1 (P1): Add Items
# AC-1: Empty cart shows $0.00
#
# Please execute these steps:
# 1. Open http://localhost:3000/cart in browser
# 2. Verify cart is empty
# 3. Take screenshot
# 4. Paste screenshot below
#
# [User provides screenshot: empty-cart.png]
#
# Agent analyzes screenshot...
# ✅ VERIFIED: Cart total shows "$0.00" as expected (Spec AC-1)
#
# AC-2: Add item updates total to $10
#
# Please execute:
# 1. Click "Products" tab
# 2. Find any product priced at $10
# 3. Click "Add to Cart"
# 4. Return to cart page
# 5. Screenshot the cart
#
# [User provides screenshot: cart-with-item.png]
#
# Agent analyzes...
# ✅ VERIFIED: Cart shows "1 item, Total: $10.00" (Spec AC-2)
#
# AC-3: Add duplicate increments quantity
#
# Please execute:
# 1. Add the same product again
# 2. Screenshot the cart
#
# [User provides screenshot: cart-duplicate.png]
#
# ✅ VERIFIED: Cart shows "Product A (qty: 2), Total: $20.00" (Spec AC-3)
#
# ... continues for US-2, US-3 ...
#
# Phase 3: Coherence Validation
# ─────────────────────────────
# ✅ Spec → Tests: All 6 acceptance criteria verified
# ✅ Plan → Implementation: All 4 tasks completed
# ✅ Domain Model: Cart, CartItem, Money correctly applied
# ✅ No unplanned functionality
#
# Phase 4: QA Report
# ──────────────────
# Creating: .harness/specs/001-shopping-cart/qa-report.md
#
# ═══════════════════════════════════
# ✅ QA PASSED - Ready for PR
# ═══════════════════════════════════
#
# Coverage: 100% acceptance criteria (3 auto, 3 manual)
# Evidence: 5 screenshots collected
# Issues: None
#
# Next: Create PR with /harness:review

# Step 5: Create PR
/harness:review

# Loads QA report, creates PR with:
# - Title: "feat: shopping cart (001)"
# - Body includes:
#   - User stories implemented (US-1, US-2, US-3)
#   - Domain model summary
#   - Test coverage: 100%
#   - QA evidence attached
#   - Coherence validation passed
#
# PR #456 created
# ✅ Ready for team review
```

---

## File Structure Created by Harness

```
<project-root>/
├── .harness/
│   ├── constitution.md              # Default constitution (shipped)
│   └── specs/
│       ├── 001-shopping-cart/
│       │   ├── spec.md             # BDD specification
│       │   ├── plan.md             # DDD implementation plan
│       │   ├── tasks.md            # Executable task list (Spec-Kit pattern)
│       │   ├── domain-model.md     # Domain design (optional)
│       │   ├── qa-report.md        # QA results + evidence
│       │   ├── qa-evidence/        # Screenshots, recordings
│       │   │   ├── empty-cart.png
│       │   │   ├── add-item.png
│       │   │   └── ...
│       │   └── coherence-map.json  # Auto-generated tracking
│       ├── 002-payment-processing/
│       │   └── ...
│       └── bug-042-preferences/
│           ├── spec.md             # Bug specification
│           └── plan.md             # Fix plan
├── tmp/                             # State files (gitignored) ★
│   ├── 20260208-143022-001-shopping-cart.json  # Active state
│   └── 20260207-091533-002-payment.json        # Another feature
├── CLAUDE.md                        # Harness instructions merged
├── .gitignore                       # tmp/ added by setup
└── src/
    └── domain/                      # Domain model (from plan)
        ├── Cart.ts                  # Aggregate root
        ├── CartItem.ts              # Entity
        └── Money.ts                 # Value object
```

---

## Classification & Mapping

### Component Classification

| Component | Type | Purpose | Auto-Invoked? | User-Facing? |
|-----------|------|---------|---------------|--------------|
| **Constitution** | System | Methodology enforcement rules | Yes (always) | View/Edit |
| **CLAUDE.md** | System | Claude-specific instructions | Yes (always) | No |
| `/harness:specify` | Command/Job | Create BDD specification | No | Yes |
| `/harness:plan` | Command/Job | Create DDD implementation plan | No | Yes |
| `/harness:tasks` | Command/Job | Break plan into executable tasks | No | Yes |
| `/harness:implement` | Command/Job | Execute tasks with TDD | No | Yes |
| `/harness:bugfix` | Command/Job | Fix bug with spec/plan | No | Yes |
| `/harness:improve` | Command/Job | Refactor with spec/plan | No | Yes |
| `/harness:qa` | Command/Job | Quality assurance (auto + manual) | No | Yes |
| `/harness:review` | Command/Job | Review coherence & create PR | No | Yes |
| `/harness:understand` | Command/Job | Explain code/domain | No | Yes |
| `/harness:debug` | Command/Job | Investigate issues | No | Yes |
| `/harness:setup` | Command/Job | Initialize Harness (once) | No | Yes |
| `/harness:clarify` | Command/Job | Refine requirements | No | Yes |
| **Specification Engine** | Methodology | BDD user stories | Yes (by specify) | No |
| **Domain Modeling Engine** | Methodology | DDD tactical design | Yes (by plan) | No |
| **Planning Engine** | Methodology | DDD + Architecture | Yes (by plan) | No |
| **TDD Engine** | Methodology | Red-Green-Refactor | Yes (by implement/fix) | No |
| **Refactoring Engine** | Methodology | Fowler's catalog | Yes (by improve/refactor phase) | No |
| **Coherence Engine** | Methodology | Spec↔Plan↔Code validation | Yes (continuous) | No |
| `constitution-enforcer` | Skill | Apply rules | Yes (all commands) | No |
| `coherence-validator` | Skill | Check alignment | Yes (continuous) | No |
| `complexity-analyzer` | Skill | Assess task size | Yes (job start) | No |
| `smell-detector` | Skill | Find code smells | Yes (improve/refactor) | No |
| `domain-analyzer` | Skill | Extract domain concepts | Yes (specify/plan) | No |
| `test-first-guide` | Skill | Guide TDD cycles | Yes (implement) | No |
| `specifier` | Agent | BDD specification | Yes (by /specify) | No |
| `domain-modeler` | Agent | DDD modeling | Yes (by plan) | No |
| `architect` | Agent | Architecture design | Yes (by plan/large) | No |
| `implementer` | Agent | TDD implementation | Yes (by /implement) | No |
| `refactoring-coach` | Agent | Systematic refactoring | Yes (by /improve) | No |
| `reviewer` | Agent | Coherence review | Yes (by /review) | No |
| `investigator` | Agent | Root cause analysis | Yes (by /debug) | No |

---

## Plugin File Mapping

### Files Shipped with Plugin

```
harness/
├── .claude-plugin/
│   └── plugin.json                    # Plugin manifest
├── commands/
│   ├── setup.md                       # Initialize Harness (run once)
│   ├── constitution.md                # View/edit constitution
│   ├── specify.md                     # Create BDD spec
│   ├── plan.md                        # Create DDD plan
│   ├── tasks.md                       # Break plan into tasks
│   ├── implement.md                   # Execute tasks with TDD
│   ├── fix.md                         # Fix bugs (spec+plan)
│   ├── improve.md                     # Refactor (spec+plan)
│   ├── qa.md                          # Quality assurance (auto + HITL)
│   ├── review.md                      # Review coherence & create PR
│   ├── understand.md                  # Explain code
│   ├── debug.md                       # Debug issues
│   └── clarify.md                     # Clarify requirements
├── agents/
│   ├── specifier.md                   # BDD specification agent
│   ├── domain-modeler.md              # DDD modeling agent
│   ├── architect.md                   # Architecture design agent
│   ├── implementer.md                 # TDD implementation agent
│   ├── refactoring-coach.md           # Refactoring agent
│   ├── qa-engineer.md                 # QA agent (auto + HITL)
│   ├── reviewer.md                    # Code review & PR agent
│   └── investigator.md                # Debugging agent
├── skills/
│   ├── constitution-enforcer/
│   │   └── SKILL.md                   # Apply rules automatically
│   ├── coherence-validator/
│   │   └── SKILL.md                   # Validate spec↔plan↔code
│   ├── complexity-analyzer/
│   │   └── SKILL.md                   # Assess task complexity
│   ├── smell-detector/
│   │   └── SKILL.md                   # Find code smells
│   ├── domain-analyzer/
│   │   └── SKILL.md                   # Extract domain concepts
│   └── test-first-guide/
│       └── SKILL.md                   # Guide TDD cycles
├── hooks/
│   └── hooks.json                     # SessionStart, PreToolUse, PostToolUse, PreCommit
├── templates/
│   ├── constitution.md                # Default constitution template
│   ├── claude-instructions.md         # Default CLAUDE.md additions
│   ├── spec-template.md               # BDD specification template
│   ├── plan-template.md               # DDD plan template
│   └── domain-model-template.md       # Domain model template
├── scripts/
│   ├── install-constitution.sh        # Copy constitution on install
│   ├── coherence-check.js             # Validate coherence map
│   ├── merge-claude-md.sh             # Merge CLAUDE.md instructions
│   ├── state-init.js                  # Initialize state machine from tasks
│   ├── state-update.js                # Update state after task completion
│   ├── state-validate.js              # Validate state against schema
│   ├── state-resume.js                # Resume from saved state
│   └── state-cleanup.js               # Archive/delete state after PR
├── schemas/
│   └── state-machine.yaml             # State schema (enforced, non-modifiable)
└── README.md                          # Plugin documentation
```

---

### Installation Flow

**Step 1: Install Plugin**
```bash
claude plugin install harness@atelier -s project
```

Plugin installs to project, making `/harness:*` commands available.

**Step 2: Run Setup (Interactive)**
```bash
claude
/harness:setup
```

Setup command:
1. Creates `.harness/` directory
2. Creates `.harness/constitution.md` from template (with customizations)
3. Creates `.harness/specs/` and `.harness/docs/` directories
4. Merges Harness instructions into `CLAUDE.md` (non-destructive)
5. Updates `README.md` with Development Workflow section (non-destructive)
6. Optionally configures git hooks
7. Creates `.harness-version` file

**Files Created/Updated**:
```
<user-repo>/
├── .harness/
│   ├── constitution.md        # Default (customizable during setup)
│   ├── specs/                 # For feature specifications
│   └── docs/                  # For domain models and ADRs
├── CLAUDE.md                  # Harness instructions merged at top
├── README.md                  # Development Workflow section added
└── .harness-version           # Plugin version tracking
```

**Result**: Repository ready for Harness workflow - spec → plan → implement with full methodology enforcement.

---

## Workflow Coherence Example

### Complete Shopping Cart Implementation

**Specification** (`.harness/specs/001-shopping-cart/spec.md`):
```markdown
# Feature 001: Shopping Cart

## User Stories

### US-1: Add Items
As a shopper, I can add items to my cart

**Scenarios**:
- Given empty cart, When I add product($10, qty=1), Then total is $10
- Given cart with item($10), When I add same product(qty=1), Then qty=2, total=$20

### US-2: Remove Items
As a shopper, I can remove items from my cart

**Scenarios**:
- Given cart with item($10, qty=1), When I remove it, Then cart is empty, total=$0

### US-3: View Total
As a shopper, I can see accurate cart total

**Scenarios**:
- Given cart with multiple items, When I view total, Then see sum of all items

## Domain Glossary
- **Cart**: Aggregate containing CartItems
- **CartItem**: Product reference with quantity
- **Money**: Value object for prices
```

**Plan** (`.harness/specs/001-shopping-cart/plan.md`):
```markdown
# Implementation Plan: Shopping Cart

## Domain Model (DDD Tactical)

### Cart (Aggregate Root)
- **Invariants**:
  - Total = sum of all items
  - No negative quantities allowed
  - No items with zero quantity
- **Methods**:
  - addItem(product, quantity) → validates quantity > 0
  - removeItem(productId) → removes all quantities
  - getTotal() → Money
- **Events**:
  - ItemAdded, ItemRemoved, CartCleared

### CartItem (Entity)
- **Identity**: productId
- **Attributes**: quantity, unitPrice
- **Belongs to**: Cart aggregate only

### Money (Value Object)
- **Immutable**
- **Attributes**: amount (number), currency (string)
- **Operations**: add(), subtract(), equals()

## Tasks

### Task 1: Money Value Object
- **Spec Reference**: US-1, US-2, US-3 (all use Money)
- **Tests**: test_money_creation, test_money_immutability, test_money_addition
- **Done**: Money class with immutability

### Task 2: Cart Aggregate - Add Item
- **Spec Reference**: US-1
- **Tests**: test_add_to_empty_cart, test_add_duplicate_item
- **Domain**: Cart aggregate, addItem method, invariants
- **Done**: Can add items, maintains total invariant

### Task 3: Cart Aggregate - Remove Item
- **Spec Reference**: US-2
- **Tests**: test_remove_item, test_remove_nonexistent_item
- **Domain**: Cart removeItem method
- **Done**: Can remove items, maintains invariants

### Task 4: Cart Aggregate - Get Total
- **Spec Reference**: US-3
- **Tests**: test_total_calculation, test_multiple_items_total
- **Domain**: getTotal method, Money aggregation
- **Done**: Accurate total calculation

## Coherence Map
- US-1 (Add Items) → Task 2 → test_add_to_empty_cart, test_add_duplicate_item
- US-2 (Remove Items) → Task 3 → test_remove_item
- US-3 (View Total) → Task 4 → test_total_calculation
```

**Implementation** (via `/harness:implement`):
```
# Task 1: Money VO

RED: test_money_creation()
  expect(new Money(10, 'USD').amount).toBe(10)
  FAILS - no Money class

GREEN: class Money { constructor(amount, currency) { ... } }
  PASSES

REFACTOR: Make immutable (Object.freeze)
  PASSES

Coherence: ✅ Task 1 complete, matches plan design
Commit: "feat(cart): implement Money value object (Task 1/4)"

# Task 2: Add Item

RED: test_add_to_empty_cart()
  cart = new Cart()
  cart.addItem(product, 1)
  expect(cart.getTotal()).toEqual(Money.of(10, 'USD'))
  FAILS - no Cart class

GREEN: class Cart {
  items = []
  addItem(product, qty) { this.items.push(new CartItem(product, qty)) }
  getTotal() { return this.items.reduce(...) }
}
  PASSES

REFACTOR: Extract CartItem entity per plan
  class CartItem { constructor(product, quantity) { ... } }
  PASSES

Coherence:
  ✅ Task 2 complete
  ✅ Domain model matches plan (Cart aggregate, CartItem entity)
  ✅ Invariant enforced (total = sum)
  ✅ US-1 acceptance criteria tested

Commit: "feat(cart): implement Cart aggregate with addItem (Task 2/4, US-1)"

# Continue for Tasks 3, 4...

# Final Coherence Report:
Specification: .harness/specs/001-shopping-cart/spec.md
Plan: .harness/specs/001-shopping-cart/plan.md

Coherence Status: ✅ FULLY ALIGNED

Spec → Plan:
  ✅ US-1 mapped to Task 2
  ✅ US-2 mapped to Task 3
  ✅ US-3 mapped to Task 4
  ✅ All acceptance criteria in plan

Plan → Implementation:
  ✅ Task 1 (Money VO) implemented
  ✅ Task 2 (Cart aggregate) implemented
  ✅ Task 3 (removeItem) implemented
  ✅ Task 4 (getTotal) implemented
  ✅ Domain model correctly applied

Spec → Tests:
  ✅ AC from US-1 → test_add_to_empty_cart, test_add_duplicate_item
  ✅ AC from US-2 → test_remove_item
  ✅ AC from US-3 → test_total_calculation
  ✅ Coverage: 100% of acceptance criteria

TDD Compliance:
  ✅ All tests written before code (git history confirms)
  ✅ Red-Green-Refactor followed
  ✅ Minimal implementations

Code Quality:
  ✅ No code smells detected
  ✅ Domain model matches plan design
  ✅ Invariants enforced in Cart aggregate

Ready to merge!
```

---

## Critical Success Factors

### 1. Coherence is Paramount
- Spec → Plan → Implementation must stay aligned
- Deviations are violations, not normal
- Constitution enforces continuous validation

### 2. Methodologies are Mandatory
- TDD not optional (constitution requires)
- Domain modeling automatic (for business logic)
- Refactoring built-in (part of TDD cycle)

### 3. Documentation is Living
- Specifications aren't discarded after planning
- Plans aren't discarded after implementation
- Coherence map tracks alignment continuously

### 4. Git History Reflects Methodology
- Can verify TDD compliance from commit order
- Each commit references spec/plan
- Atomic refactorings visible in history

---

## Harness Plugin Classification

### Plugin Components

**Commands (12 Job-Focused)**:
1. `/harness:setup` - Initialize Harness (run once)
2. `/harness:constitution` - View/edit rules
3. `/harness:specify` - Create BDD spec (Spec-Kit pattern)
4. `/harness:plan` - Create DDD plan
5. `/harness:tasks` - Break down plan into executable tasks (Spec-Kit pattern)
6. `/harness:implement` - Execute tasks with TDD
7. `/harness:qa` - Quality assurance (automated + manual HITL)
8. `/harness:bugfix` - Fix bugs (spec+plan+tasks) - Fix with spec/plan/tasks
9. `/harness:improve` - Refactor with spec/plan - Refactor with spec/plan
10. `/harness:understand` - Explain code (read-only)
11. `/harness:debug` - Investigate production issues
12. `/harness:clarify` - Refine vague requirements

**Agents (8 Specialized)**:
1. `specifier` - BDD specifications
2. `domain-modeler` - DDD modeling
3. `architect` - Architecture design
4. `implementer` - TDD execution
5. `refactoring-coach` - Systematic refactoring
6. `qa-engineer` - Quality assurance (automated + HITL)
7. `reviewer` - Coherence validation & PR creation
8. `investigator` - Root cause analysis

**Skills (7 Auto-Invoked)**:
1. `constitution-enforcer` - Apply rules
2. `coherence-validator` - Validate alignment (★ Critical)
3. `state-machine-enforcer` - Enforce task order and prevent deviation (★ Critical)
4. `complexity-analyzer` - Assess tasks
5. `smell-detector` - Find refactoring opportunities
6. `domain-analyzer` - Extract concepts
7. `test-first-guide` - Guide TDD

**Methodology Engines (7 Internal)**:
1. Specification Engine (BDD)
2. Domain Modeling Engine (DDD)
3. Planning Engine (DDD + Architecture)
4. Task Engine (Spec-Kit pattern breakdown)
5. TDD Engine (Red-Green-Refactor)
6. Refactoring Engine (Fowler's catalog)
7. Coherence Engine (★ Core differentiator)

**State Management**:
- State Machine (linked list execution)
- State Schema Validation (YAML-enforced)
- State Persistence (tmp/ JSON files)

**Hooks (4 Enforcement Points)**:
1. `SessionStart` - Load constitution, display coherence status
2. `PreToolUse` - Check plan exists, TDD compliance
3. `PostToolUse` - Run tests, detect smells, validate coherence
4. `PreCommit` - Coherence gate (blocks if violations)

**Templates (5 Shipped)**:
1. `constitution.md` - Default methodology rules
2. `claude-instructions.md` - CLAUDE.md additions
3. `spec-template.md` - BDD specification format
4. `plan-template.md` - DDD plan format
5. `domain-model-template.md` - Domain design format

---

## Complete Methodology Integration Map

```
Constitution (Shipped Default)
    ↓
┌───────────────────────────────────────────┐
│  JOBS (Sequential Workflow)               │
├───────────────────────────────────────────┤
│ 1. /harness:specify → BDD Specification   │
│ 2. /harness:plan → DDD Plan               │
│ 3. /harness:tasks → Executable Tasks ★    │
│ 4. /harness:implement → TDD Execute       │
│ 5. /harness:qa → Quality Assurance ★      │
│ 6. /harness:review → Create PR            │
│                                            │
│ Anytime:                                   │
│ - /harness:improve → Refactor             │
│ - /harness:bugfix → Bug Fix (spec+plan+tasks)│
│ - /harness:understand → Learn Code        │
│ - /harness:debug → Investigate            │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│  METHODOLOGIES (Auto-Enforced)            │
├───────────────────────────────────────────┤
│ Specification Engine → BDD                │
│ Domain Modeling → DDD Strategic           │
│ Planning Engine → DDD Tactical            │
│ TDD Engine → Red-Green-Refactor           │
│ Refactoring Engine → Fowler               │
│ QA Engine → Automated + HITL ★            │
│ Coherence Engine → Validate ★             │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│  ARTIFACTS (Living Documents)             │
├───────────────────────────────────────────┤
│ spec.md (BDD user stories)                │
│ plan.md (DDD domain model)                │
│ tasks.md (executable task breakdown) ★    │
│ domain-model.md (detailed DDD)            │
│ Implementation (tests + code)             │
│ qa-report.md (evidence + sign-off) ★      │
│ coherence-map.json (tracking)             │
└───────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────┐
│  VALIDATION (Continuous + QA Gate)        │
├───────────────────────────────────────────┤
│ Spec ↔ Plan Coherence                    │
│ Plan ↔ Implementation Coherence          │
│ Spec ↔ Tests Coherence                   │
│ Domain Model Coherence                   │
│ QA Verification ★ (auto + manual)         │
│   → Blocks PR if not signed off           │
└───────────────────────────────────────────┘
```

---

## Key Innovation: Coherence as First-Class Concern

**What Makes Harness Different**:

1. **Spec-Kit**: Creates specs, but implementation can drift
   - No automatic coherence checking
   - Manual alignment required

2. **Pure TDD**: Implementation-focused, no specs
   - Tests drive design, but no business spec
   - No coherence to validate

3. **Pure DDD**: Domain-focused, but no implementation enforcement
   - Models created, but implementation may not follow
   - No automatic validation

4. **Harness**: Integrates ALL with **coherence engine**
   - Spec (BDD) → Plan (DDD) → Implementation (TDD) → Refactoring (Fowler)
   - **Continuous coherence validation**
   - Constitution enforces the whole cycle
   - Deviations flagged immediately

---

## Success Criteria

### Coherence Metrics (Primary)
- **Spec-Plan Alignment**: 100% of user stories in plan
- **Plan-Implementation Alignment**: 100% of tasks implemented
- **Spec-Test Alignment**: 100% of acceptance criteria tested
- **Domain Model Coherence**: Code matches plan design

### Methodology Compliance
- **TDD Compliance**: Tests before code (git history proof)
- **DDD Application**: Domain models in complex features
- **Refactoring Discipline**: Smells addressed systematically
- **BDD Specifications**: All features have specs

### Quality Outcomes
- **Test Coverage**: High (driven by acceptance criteria)
- **Code Smells**: Low (continuous refactoring)
- **Documentation**: Always current (living specs/plans)
- **Architectural Coherence**: ADRs followed

---

## Conclusion

Harness is a **complete development harness** that enforces:

1. **BDD Specifications** (Spec-Kit pattern) - Prioritized, independently testable user stories
2. **DDD Planning** (Eric Evans) - Domain modeling with aggregates, entities, value objects
3. **Task Breakdown** (Spec-Kit pattern) - Executable tasks organized by user story
4. **State Machine** (Harness innovation) ★ - Enforces task order, prevents deviation, enables resumability
5. **TDD Implementation** (Kent Beck) - Red-Green-Refactor cycle mandatory
6. **Quality Assurance** (Harness) - Automated tests + Human-in-the-Loop verification
7. **Systematic Refactoring** (Martin Fowler) - Code smell detection and catalog application
8. **Continuous Coherence Validation** (Harness innovation) - Spec ↔ Plan ↔ Tasks ↔ Implementation ↔ QA

**The Constitution** ships with the plugin and enforces the entire methodology stack by default. Developers state jobs, Harness applies methodologies automatically while maintaining strict coherence from specification through QA to PR creation.

**Key Innovations**:

1. **State Machine** ★ - Prevents deviation from plan, survives compaction, enables multi-session work
   - Task execution via linked list (T001 → T002 → T003...)
   - TDD phase tracking (red → green → refactor)
   - Coherence enforcement on every state update
   - Cannot skip tasks or implement out of order

2. **QA as First-Class Phase** ★ - Not an afterthought
   - Human-in-the-Loop when E2E tests missing
   - User provides screenshots/evidence
   - Agent validates against acceptance criteria
   - QA report blocks PR if sign-off fails

3. **Compaction-Safe** ★ - State persists when context doesn't
   - State file survives compaction
   - Agent reloads state and resumes exactly where it was
   - No lost work, no confusion

**Result**: Professional-grade development workflow with ironclad process enforcement, resumability across sessions, and quality assurance that ensures specifications are actually met.

---

## References

- **BDD**: Behavior-Driven Development (inspired by Spec-Kit)
- **DDD**: Eric Evans, Domain-Driven Design (2003)
- **TDD**: Kent Beck, Test-Driven Development by Example (2002)
- **Refactoring**: Martin Fowler, Refactoring 2nd Ed (2018)
- **Coherence**: Harness innovation (continuous validation)
