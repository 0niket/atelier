# Spec-Kit Integration Analysis for Harness

## Spec-Kit Workflow (From tmp/spec-kit Analysis)

### 1. `/speckit.specify` Command
**Creates**: `specs/[###-feature-name]/spec.md`

**Key Features**:
- Auto-numbers features (001, 002, 003)
- Creates feature branch (`###-feature-name`)
- **Prioritized user stories** (P1, P2, P3)
- **Independent testability** - each story is MVP-capable
- Given-When-Then acceptance scenarios
- Functional requirements (FR-001, FR-002, etc.)
- Success criteria (measurable outcomes)
- Key entities identified
- Marks uncertainties as `[NEEDS CLARIFICATION]`

**Template Structure**:
```markdown
# Feature Specification: [NAME]

## User Scenarios & Testing
### User Story 1 (Priority: P1) 🎯 MVP
- Description
- Why this priority
- Independent test criteria
- Acceptance scenarios (Given-When-Then)

### User Story 2 (Priority: P2)
...

### Edge Cases

## Requirements
### Functional Requirements
- FR-001: System MUST...
- FR-002: System MUST...

### Key Entities
- Entity 1: description
- Entity 2: description

## Success Criteria
### Measurable Outcomes
- SC-001: [metric]
- SC-002: [metric]
```

---

### 2. `/speckit.plan` Command
**Creates**:
- `specs/[###-feature]/plan.md` - Main plan
- `specs/[###-feature]/research.md` - Phase 0 research
- `specs/[###-feature]/data-model.md` - Phase 1 entities
- `specs/[###-feature]/contracts/` - Phase 1 API contracts
- `specs/[###-feature]/quickstart.md` - Phase 1 validation guide

**Workflow Phases**:
- **Phase 0: Research** - Resolve all `[NEEDS CLARIFICATION]` via research agents
- **Phase 1: Design** - Create data model, API contracts, quickstart
- **Constitution Check** - Validate against project constitution gates

**Template Structure**:
```markdown
# Implementation Plan: [FEATURE]

## Summary
[High-level approach]

## Technical Context
- Language/Version
- Primary Dependencies
- Storage
- Testing Framework
- Performance Goals
- Constraints

## Constitution Check
[Gates from constitution]

## Project Structure
specs/[###-feature]/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
└── quickstart.md
```

---

### 3. `/speckit.tasks` Command
**Creates**: `specs/[###-feature]/tasks.md`

**Key Features**:
- **Organized by user story** (not linear task list)
- Each story independently implementable
- Tasks marked `[P]` can run in parallel
- Tasks marked `[Story]` map to user stories (US1, US2, etc.)
- **Foundation phase** - blocks all stories until complete
- **MVP-first strategy** - P1 story alone is viable product

**Template Structure**:
```markdown
# Tasks: [FEATURE]

## Phase 1: Setup (Shared)
- T001: Initialize project structure

## Phase 2: Foundational (BLOCKS ALL)
⚠️ CRITICAL: No user story work until this completes
- T004: Database setup
- T005: Auth framework
- T006: API routing

## Phase 3: User Story 1 (P1) 🎯 MVP
### Tests (write FIRST, ensure FAIL)
- T010 [P] [US1]: Contract test
- T011 [P] [US1]: Integration test

### Implementation
- T012 [P] [US1]: Create Entity1
- T013 [P] [US1]: Create Entity2
- T014 [US1]: Implement Service
- T015 [US1]: Implement endpoint

**Checkpoint**: US1 fully functional independently

## Phase 4: User Story 2 (P2)
[Same structure]

## Dependencies
- Setup → Foundational → User Stories (parallel) → Polish
```

---

### 4. `/speckit.implement` Command
**Executes**: Tasks from `tasks.md`

**Key Features**:
- **Checklist enforcement** - verifies checklists complete before implementing
- Processes tasks in order (respects dependencies)
- Stops at checkpoints for validation
- Can implement MVP only (Phase 3) or full feature

---

## What Harness Should Adopt from Spec-Kit

### ✅ Adopt Completely

1. **Prioritized User Stories**
   - P1, P2, P3 priority system
   - Each story independently testable
   - MVP = P1 story alone

2. **Independent Testability**
   - "Can this story ship alone and deliver value?"
   - Forces proper feature decomposition
   - Enables incremental delivery

3. **Auto-Numbering**
   - 001, 002, 003 feature numbering
   - Prevents collisions
   - Clear chronological order

4. **Branch Automation**
   - Auto-create `###-feature-name` branches
   - Consistent naming
   - Links branch to spec

5. **[NEEDS CLARIFICATION] Markers**
   - Explicit uncertainty flagging
   - Limit to 3 max (forces thinking)
   - Resolved in research phase

6. **Constitution Gates**
   - Check against project rules
   - Block if violations unjustified
   - Force discipline

7. **Foundational Phase**
   - Blocking dependencies explicit
   - "Can't start stories until foundation ready"
   - Prevents premature implementation

8. **Checkpoint Validation**
   - Stop after each story
   - Test independently
   - Deploy/demo before continuing

### ⚠️ Modify for Harness

1. **Research Phase**
   - Spec-Kit: Separate research.md with agent dispatch
   - Harness: Integrate into planning, not separate phase
   - Reason: Harness uses DDD domain modeling instead

2. **Data Model**
   - Spec-Kit: Entity-relationship style (data-model.md)
   - Harness: DDD domain model (aggregates, entities, VOs)
   - Reason: DDD provides richer behavioral modeling

3. **Tasks Organization**
   - Spec-Kit: Phases by user story
   - Harness: Tasks by aggregate/domain component
   - Reason: DDD aggregate = natural task boundary

4. **Contract Generation**
   - Spec-Kit: Separate contracts/ directory
   - Harness: Include in plan.md as "Integration Contracts"
   - Reason: Simpler structure, less fragmentation

### ❌ Don't Adopt

1. **Optional Tests**
   - Spec-Kit: Tests marked "OPTIONAL"
   - Harness: Tests MANDATORY (TDD constitution)
   - Reason: TDD is core to Harness methodology

2. **Vague "Polish Phase"**
   - Spec-Kit: Generic cleanup at end
   - Harness: Continuous refactoring per TDD cycle
   - Reason: Refactoring happens in Refactor phase, not deferred

---

## Refined Harness Specification Format

Combining spec-kit's strengths with DDD/TDD:

```markdown
# Feature Specification: Shopping Cart

**Feature**: `001-shopping-cart`
**Branch**: `001-shopping-cart`
**Created**: 2026-02-08
**Status**: Draft

## User Stories (Prioritized, Independently Testable)

### US-1: Add Items to Cart (Priority: P1) 🎯 MVP
As a shopper, I can add items to my cart so I can purchase multiple products.

**Why P1**: Core cart functionality - without this, no cart exists. Independently deliverable.

**Independent Test**: User can add item, see it in cart, see correct total. Ships as minimal viable cart.

**Acceptance Scenarios**:
1. **Given** empty cart, **When** I add Product A (qty=1, price=$10), **Then** cart contains 1 item, total is $10
2. **Given** cart with Product A (qty=1), **When** I add Product A (qty=1), **Then** cart has Product A (qty=2), total is $20
3. **Given** cart with Product A, **When** I add Product B, **Then** cart has 2 different products

**Domain Concepts Introduced**:
- **Cart** (aggregate): Container for items, calculates total
- **CartItem** (entity): Product reference + quantity
- **Money** (value object): Price representation

---

### US-2: Remove Items from Cart (Priority: P2)
As a shopper, I can remove items from my cart so I can change my mind.

**Why P2**: Enhances US-1, but cart works without it. Can ship US-1 alone first.

**Independent Test**: Given cart with items (from US-1), can remove them. Doesn't break US-1 if not implemented.

**Acceptance Scenarios**:
1. **Given** cart with Product A (qty=2), **When** I remove Product A, **Then** cart is empty, total is $0
2. **Given** cart with Products A and B, **When** I remove A, **Then** cart has only B

**Domain Concepts**:
- Cart.removeItem() method
- Maintains total invariant

---

### US-3: View Cart Summary (Priority: P3)
As a shopper, I can see cart summary with itemized breakdown.

**Why P3**: Nice-to-have display feature. US-1 + US-2 provide core functionality.

**Independent Test**: Cart summary displays correct info. Doesn't affect US-1/US-2 if not implemented.

**Acceptance Scenarios**:
1. **Given** cart with multiple items, **When** I view summary, **Then** see each item with quantity, price, subtotal, and grand total

---

## Functional Requirements

- **FR-001**: System MUST prevent negative quantities in cart
- **FR-002**: System MUST calculate total as sum of all item prices × quantities
- **FR-003**: System MUST handle duplicate items by incrementing quantity
- **FR-004**: System MUST persist cart across sessions [NEEDS CLARIFICATION: storage mechanism?]

## Domain Model (Preliminary)

**Identified from user stories**:

- **Cart** (Aggregate Root)
  - Contains multiple CartItems
  - Enforces invariants (no negative qty, accurate total)
  - Commands: addItem(), removeItem(), clear()
  - Queries: getTotal(), getItems()

- **CartItem** (Entity within Cart aggregate)
  - Identity: productId
  - Attributes: quantity, unitPrice
  - Cannot exist outside Cart

- **Money** (Value Object)
  - Immutable
  - Attributes: amount, currency
  - Operations: add(), multiply()

- **Product** (External Reference)
  - Not part of Cart aggregate
  - Referenced by ID only in CartItem

## Edge Cases

- Adding item with quantity = 0 → reject with validation error
- Adding item with negative quantity → reject with validation error
- Removing non-existent item → silently succeed (idempotent)
- Cart total overflow (very large quantities) → [NEEDS CLARIFICATION: max cart value?]

## Success Criteria

- **SC-001**: User can add item and see updated total within 100ms
- **SC-002**: Cart state persists across browser refresh/app background
- **SC-003**: 100% of acceptance scenarios pass automated tests

## Uncertainties

1. **Storage**: In-memory, localStorage, database? [NEEDS CLARIFICATION]
2. **Cart Lifecycle**: When does cart expire? Session-based or permanent?
3. **Max Items**: Any limit on cart size?

*These will be resolved in planning phase research*
```

---

## Refined Harness Plan Format

Combining spec-kit's plan structure with DDD:

```markdown
# Implementation Plan: Shopping Cart

**Spec**: `specs/001-shopping-cart/spec.md`
**Branch**: `001-shopping-cart`

## Summary

Implement shopping cart aggregate with add/remove/total capabilities using DDD tactical patterns and TDD implementation.

## Technical Context

**Language**: TypeScript 5.x
**Testing**: Jest
**Architecture**: Hexagonal (domain core, ports)
**Domain Driven**: Yes (Cart is aggregate root)

## Constitution Check

✅ TDD Required: Yes (will implement with Red-Green-Refactor)
✅ Domain Modeling: Yes (business logic present - cart rules)
✅ Refactoring: Yes (during Refactor phase)
⚠️ Complexity Justified: Medium complexity (3 user stories, 1 aggregate)

## Phase 0: Research & Clarifications

### Resolved Uncertainties

**Q1: Storage mechanism?**
- **Decision**: Start with in-memory, add persistence later
- **Rationale**: US-1 doesn't require persistence, defer for US-4
- **Alternative**: LocalStorage rejected - premature for MVP

**Q2: Cart lifecycle?**
- **Decision**: Session-based (cleared on logout)
- **Rationale**: Standard e-commerce pattern
- **Alternative**: Permanent rejected - requires user accounts first

**Q3: Max items?**
- **Decision**: 100 items max
- **Rationale**: Reasonable limit, prevents abuse
- **Alternative**: Unlimited rejected - DoS risk

## Phase 1: Domain Model (DDD Tactical Design)

### Bounded Context

**Cart Context**:
- Responsible for: Shopping cart management
- Dependencies: Product Catalog (external context)
- Anti-corruption layer: ProductReference value object

### Aggregates

#### Cart (Aggregate Root)

**Invariants** (MUST always hold):
1. Total = sum of all (item.quantity × item.unitPrice)
2. All item quantities > 0
3. No duplicate product IDs in items array

**State**:
- items: CartItem[] (private)
- sessionId: string (identity)

**Commands** (write operations):
- `addItem(productId: string, quantity: number, unitPrice: Money): void`
  - Validates quantity > 0
  - If product exists: increment quantity
  - If new: add CartItem
  - Emits: ItemAdded event

- `removeItem(productId: string): void`
  - Removes item completely (all quantities)
  - Idempotent (no error if not found)
  - Emits: ItemRemoved event

- `clear(): void`
  - Removes all items
  - Emits: CartCleared event

**Queries** (read operations):
- `getTotal(): Money` - calculates from items
- `getItems(): ReadonlyArray<CartItem>` - returns copy
- `isEmpty(): boolean`

**Domain Events**:
- ItemAdded(productId, quantity, unitPrice)
- ItemRemoved(productId)
- CartCleared()

### Entities

#### CartItem (Entity within Cart)

**Identity**: productId (string)

**Attributes**:
- quantity: number (positive integer)
- unitPrice: Money
- productId: string

**Behavior**:
- `getSubtotal(): Money` - quantity × unitPrice

**Rules**:
- Cannot exist outside Cart aggregate
- Quantity always > 0
- Immutable once created (Cart manages changes)

### Value Objects

#### Money (Value Object)

**Attributes**:
- amount: number (decimal)
- currency: string (ISO 4217 code)

**Immutability**: Yes (create new instance for changes)

**Operations**:
- `add(other: Money): Money` - same currency only
- `multiply(factor: number): Money`
- `equals(other: Money): boolean`
- `static zero(currency = 'USD'): Money`

**Validation**:
- Currency must match for add operations
- Amount can be zero or positive only

## Phase 2: Architecture

**Pattern**: Hexagonal (Ports & Adapters)

**Layers**:
1. **Domain** (core):
   - Cart aggregate
   - CartItem entity
   - Money value object
   - No dependencies

2. **Application** (use cases):
   - AddItemToCartUseCase
   - RemoveItemFromCartUseCase
   - GetCartTotalUseCase

3. **Infrastructure** (adapters):
   - InMemoryCartRepository (for now)
   - Later: RedisCartRepository, SQLCartRepository

**Testing Strategy**:
- **Unit Tests**: Domain model (aggregate, entities, VOs)
- **Integration Tests**: Use cases with repository
- **Contract Tests**: External Product API calls

## Phase 3: Task Breakdown

### Foundation (BLOCKS ALL)
- **T001**: Setup TypeScript project with Jest
- **T002**: Configure linting (ESLint) and formatting (Prettier)

**Checkpoint**: Foundation ready

---

### User Story 1: Add Items (P1) 🎯 MVP

**Goal**: Functional shopping cart with add capability

#### Tests (TDD - Write FIRST, ensure FAIL)
- **T003 [P] [US1]**: test_money_value_object - Money creation, immutability, add, multiply
- **T004 [P] [US1]**: test_empty_cart_has_zero_total
- **T005 [P] [US1]**: test_add_item_to_empty_cart
- **T006 [P] [US1]**: test_add_duplicate_item_increments_quantity

#### Implementation (TDD - After tests written and FAILING)
- **T007 [US1]**: Implement Money value object (makes T003 pass)
- **T008 [US1]**: Implement Cart aggregate with getTotal() (makes T004 pass)
- **T009 [US1]**: Implement addItem() method (makes T005, T006 pass)
- **T010 [US1]**: Implement CartItem entity (extracted during refactor phase)

**Coherence Map**:
- Spec AC-1 "empty cart = $0" → T004 (test) → T008 (implementation)
- Spec AC-2 "add item = total updated" → T005 (test) → T009 (implementation)
- Spec AC-3 "duplicate increments qty" → T006 (test) → T009 (implementation)

**Checkpoint**: US-1 fully functional. Can ship MVP!

---

### User Story 2: Remove Items (P2)

#### Tests (TDD)
- **T011 [P] [US2]**: test_remove_item_from_cart
- **T012 [P] [US2]**: test_remove_nonexistent_item_succeeds

#### Implementation
- **T013 [US2]**: Implement removeItem() method

**Coherence Map**:
- Spec AC "remove empties cart" → T011 → T013

**Checkpoint**: US-1 + US-2 both functional

---

### User Story 3: View Summary (P3)

#### Tests (TDD)
- **T014 [US3]**: test_cart_summary_display

#### Implementation
- **T015 [US3]**: Implement getSummary() method

**Checkpoint**: All user stories complete

---

## Dependencies

```
T001, T002 (Foundation)
    ↓
[T003, T004, T005, T006] (US1 Tests - parallel)
    ↓
[T007, T008] (US1 Implementation - parallel initially)
    ↓
T009 (US1 addItem)
    ↓
T010 (Refactor to CartItem entity)
    ↓
CHECKPOINT: MVP Ready
    ↓
[T011, T012] (US2 Tests - parallel)
    ↓
T013 (US2 Implementation)
    ↓
CHECKPOINT: US1+US2 Ready
    ↓
T014 (US3 Test)
    ↓
T015 (US3 Implementation)
    ↓
CHECKPOINT: All Stories Complete
```

## Independent Story Delivery

**MVP (P1 only)**:
- Foundation + US-1 = Working cart
- Users can add items, see total
- Shippable product

**MVP + P2**:
- Add US-2 = Can also remove
- Enhances MVP, doesn't break it

**Full Feature**:
- Add US-3 = Nice summary view
- Complete but US-1 alone was viable
```

---

## Key Insights for Harness

### 1. Priority-Driven User Stories
Spec-kit's prioritization (P1/P2/P3) with independent testability is **brilliant** for:
- Forcing proper decomposition
- Enabling MVP delivery
- Supporting incremental rollout
- Team parallelization

**Harness should adopt this completely**.

### 2. Foundational Phase Blocking
Explicit "BLOCKS ALL" phase prevents:
- Implementing user stories without infrastructure
- Duplicate infrastructure work across stories
- Integration problems later

**Harness should adopt: Foundation → Stories pattern**.

### 3. Task-Story Mapping
`[US1]` tags on tasks creates traceability:
- Easy to see what implements each story
- Can track story completion
- Supports coherence validation

**Harness coherence-map.json should use this**.

### 4. Checkpoints for Validation
Stopping after each story to validate independently:
- Catches integration issues early
- Enables demo/deploy at any checkpoint
- Reduces risk

**Harness should enforce checkpoints in `/harness:implement`**.

---

## Differences: Spec-Kit vs Harness

| Aspect | Spec-Kit | Harness (Refined) |
|--------|----------|-------------------|
| **Domain Model** | Entity-relationship (data-model.md) | DDD aggregates/entities/VOs |
| **Research** | Separate phase with research.md | Integrated into planning (DDD discovery) |
| **Tests** | Optional (marked in tasks) | Mandatory (TDD constitution) |
| **Task Organization** | By user story phases | By user story + aggregate |
| **Refactoring** | End polish phase | Continuous (TDD Refactor phase) |
| **Coherence** | Manual (developer tracks) | Automatic (coherence engine) |
| **Contracts** | Separate contracts/ directory | Integrated in plan |
| **Constitution** | Referenced but not enforced | Automatically enforced |

---

## Recommendation: Refined Harness Spec-Kit Integration

### `/harness:specify` Should Create:

```markdown
# Feature: Shopping Cart (001)

## User Stories (P1→P2→P3, Each Independently Testable)

### US-1: Add Items (P1) 🎯 MVP
[Description]
**Why P1**: [Reasoning]
**Independent Test**: [How to test alone]
**Given-When-Then scenarios**

[... US-2, US-3 ...]

## Functional Requirements
FR-001, FR-002, etc.

## Domain Model (Preliminary DDD)
- Cart (aggregate)
- CartItem (entity)
- Money (value object)

## Edge Cases

## Success Criteria (Measurable)

## Uncertainties
[NEEDS CLARIFICATION: ...]  (max 3)
```

### `/harness:plan` Should Create:

```markdown
# Plan: Shopping Cart (001)

## Technical Context
[Language, deps, etc.]

## Constitution Compliance
✅ TDD, DDD, etc.

## Domain Model (DDD Tactical - Full Design)

### Cart Aggregate
[Full aggregate design with invariants, commands, events]

### CartItem Entity
[Full entity design]

### Money Value Object
[Full VO design]

## Architecture
[Hexagonal, etc.]

## Tasks (By User Story + Aggregate)

### Foundation (BLOCKS ALL)
- T001, T002

### US-1: Add Items (P1) - Cart Aggregate

#### Tests (TDD - Write FIRST)
- T003 [P] [US1]: test_money_creation
- T004 [P] [US1]: test_empty_cart
- T005 [P] [US1]: test_add_item

#### Implementation (After tests FAIL)
- T006 [US1]: Money VO
- T007 [US1]: Cart aggregate with addItem()
- T008 [US1]: CartItem entity (refactor phase)

**Checkpoint**: US-1 MVP ready

### US-2: Remove Items (P2)
[Same pattern]

### US-3: View Summary (P3)
[Same pattern]

## Coherence Map
US-1 → Tasks [T003-T008]
AC from US-1 → Tests [T004, T005]
Cart aggregate → Tasks [T007, T008]
```

---

## Conclusion

Spec-kit provides excellent **structure for specifications and task organization**:
- Prioritized, independently testable user stories
- Foundation-first blocking
- Checkpoint-driven delivery
- Clear traceability

Harness should **adopt this structure** while adding:
- **DDD domain modeling** (richer than entity-relationship)
- **TDD enforcement** (tests mandatory, not optional)
- **Automatic coherence validation** (not manual)
- **Continuous refactoring** (not end-phase polish)

**Result**: Best of both worlds - spec-kit's disciplined structure + Harness's methodology enforcement + coherence validation.
