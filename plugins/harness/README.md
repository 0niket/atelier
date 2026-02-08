# Harness Plugin

Complete development workflow for Claude Code with BDD specifications, DDD planning, TDD implementation, state management, and QA automation.

## What is Harness?

Harness is a Claude Code plugin that enforces software engineering best practices through a **constitution-driven workflow**. It integrates:

- **BDD Specifications** (Spec-Kit inspired) - Prioritized, independently testable user stories
- **DDD Planning** (Eric Evans) - Domain modeling with aggregates, entities, value objects
- **TDD Implementation** (Kent Beck) - Red-Green-Refactor cycle mandatory
- **State Management** - Prevents deviation, enables resumability, survives compaction
- **QA Automation** - Automated tests + Human-in-the-Loop verification
- **Coherence Validation** - Spec ↔ Plan ↔ Tasks ↔ Implementation continuously aligned

## Installation

```bash
claude plugin install harness@atelier -s project
```

Then run setup:
```bash
claude
/harness:setup
```

This creates:
- `.harness/constitution.md` - Methodology enforcement rules
- `CLAUDE.md` - Development instructions (merged)
- `README.md` - Workflow documentation (updated)
- `tmp/` - State files directory (gitignored)

## Quick Start

### 1. Create Specification
```bash
/harness:specify Add shopping cart functionality
```

Agent asks for ticket (ClickUp/Jira/GitHub), creates:
- Feature branch: `<ticket-id>-shopping-cart`
- BDD spec with prioritized user stories (P1=MVP, P2/P3=enhancements)
- Preliminary domain model

### 2. Create Plan
```bash
/harness:plan
```

Creates DDD implementation plan:
- Full domain model (aggregates, entities, value objects)
- Architecture design
- Task breakdown by user story

### 3. Create Tasks
```bash
/harness:tasks
```

Breaks plan into executable tasks:
- Foundation (BLOCKS ALL) → US-1 (P1) → US-2 (P2) → US-3 (P3)
- Initializes state machine: `tmp/<timestamp>-<ticket-id>.json`
- Linked list: T001 → T002 → ... → null

### 4. Implement with TDD
```bash
/harness:implement
```

Executes tasks via state machine:
- Loads state, resumes from currentTask
- Follows Red-Green-Refactor per task
- Updates state after each phase
- Cannot skip or reorder tasks
- Commits atomically per task

### 5. Quality Assurance
```bash
/harness:qa
```

Runs QA:
- Automated tests (unit, integration, E2E)
- Manual QA if E2E missing (Human-in-the-Loop with screenshots)
- Generates QA report with evidence
- Asks: "Create Pull Request? [Y/n]"
- Creates PR if confirmed

## Commands

### Workflow Commands (Sequential)
- `/harness:setup` - Initialize (run once)
- `/harness:specify` - Create BDD spec
- `/harness:plan` - Create DDD plan
- `/harness:tasks` - Break into executable tasks
- `/harness:implement` - Execute with TDD + state machine
- `/harness:qa` - QA verification + PR creation

### Other Commands
- `/harness:bugfix` - Fix bugs (spec+plan+tasks+TDD)
- `/harness:improve` - Refactor systematically (Fowler's catalog)
- `/harness:understand` - Explain code/architecture
- `/harness:debug` - Investigate production issues
- `/harness:clarify` - Refine vague requirements
- `/harness:constitution` - View/customize rules

## Key Features

### 🎯 Ticket-Driven Workflow
- Start with ClickUp/Jira/GitHub ticket
- Branch naming: `<ticket-id>-<short-desc>`
- Ticket linked in all documentation

### 🏗️ State Machine
- Prevents task skipping/reordering
- Survives context compaction
- Enables multi-session work
- Strict coherence enforcement
- Linked list: T001 → T002 → T003 → ...

### ✅ Human-in-the-Loop QA
- When E2E tests missing
- Step-by-step user guidance
- Screenshot evidence collection
- Visual validation with AI
- QA report with proof

### 🔗 Coherence Validation
- Spec ↔ Plan ↔ Tasks ↔ Implementation
- Continuous validation
- Blocks commits if violations
- Living documentation

### 🚫 Protected Branch Enforcement
- Never work on main/master
- All changes via feature branches
- PR creation only after QA sign-off

## Methodologies Enforced

**Constitution ships with plugin** and mandates:

1. **Branch-Based Workflow** - Ticket-driven feature branches
2. **BDD Specifications** - Given-When-Then acceptance scenarios
3. **DDD Domain Modeling** - Aggregates, entities, value objects
4. **TDD Implementation** - Tests before code (Red-Green-Refactor)
5. **Systematic Refactoring** - Fowler's catalog during refactor phase
6. **QA Verification** - Automated + manual before PR
7. **Coherence Validation** - Continuous alignment checking

## File Structure

```
<project-root>/
├── .harness/
│   ├── constitution.md              # Methodology rules
│   └── specs/
│       └── <ticket-id>-<feature>/
│           ├── spec.md              # BDD specification
│           ├── plan.md              # DDD implementation plan
│           ├── tasks.md             # Executable task list
│           ├── qa-report.md         # QA results + evidence
│           └── qa-evidence/         # Screenshots, recordings
├── tmp/                             # State files (gitignored)
│   └── <timestamp>-<ticket-id>.json # State machine
├── CLAUDE.md                        # Harness instructions
└── src/domain/                      # Domain model (from plan)
```

## Examples

See `docs/plans/harness-plugin.md` for:
- Complete workflow example (shopping cart)
- State machine details
- Coherence validation
- QA Human-in-the-Loop flow

## References

- **BDD**: Inspired by Spec-Kit methodology
- **DDD**: Eric Evans, Domain-Driven Design (2003)
- **TDD**: Kent Beck, Test-Driven Development by Example (2002)
- **Refactoring**: Martin Fowler, Refactoring 2nd Ed (2018)

---

## Support

For issues or questions, see: `docs/plans/harness-plugin.md`
