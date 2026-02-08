---
description: Refine vague requirements into clear specifications
---

# Requirement Clarification

Extract clear requirements and domain understanding from vague descriptions.

## User Input

Vague requirement: "$ARGUMENTS"

## Workflow

### Phase 1: Clarifying Questions

Ask targeted questions to understand:

**Scope Questions**:
- "What is the main goal of this feature?"
- "Who are the users?"
- "What problem does this solve?"

**Domain Questions**:
- "What are the key concepts/entities involved?"
- "What business rules must be enforced?"
- "What are the success/failure scenarios?"

**Edge Case Questions**:
- "What happens when [boundary condition]?"
- "How should system handle [error scenario]?"
- "What are the limits/constraints?"

### Phase 2: Domain Concept Extraction

From answers, identify:

**Entities** (nouns with identity):
- Example: User, Order, Product

**Actions** (verbs → commands/events):
- Commands: CreateOrder, AddItem
- Events: OrderCreated, ItemAdded

**Business Rules**:
- Invariants that must hold
- Validation rules
- Constraints

**Value Objects**:
- Descriptive attributes without identity
- Example: Money, Email, Address

### Phase 3: Acceptance Criteria

Transform answers into Given-When-Then:

**From vague**: "Users should be able to get refunds"

**To clear**:
- **Given** order is delivered and < 30 days old
- **When** user requests refund
- **Then** refund processed and confirmation sent

- **Given** order is > 30 days old
- **When** user requests refund
- **Then** refund rejected with explanation

### Phase 4: Output

Create preliminary specification or suggest full `/harness:specify`:

**Option 1: Simple (small feature)**:
Display refined requirements:
```
Refined Requirements
═══════════════════

Feature: User Refunds

User Stories:
- As a customer, I can request refund within 30 days
- As a system, I reject refunds after 30 days

Acceptance Criteria:
- Given order < 30 days, When refund requested, Then processed
- Given order > 30 days, When refund requested, Then rejected

Domain Concepts:
- Refund (entity)
- RefundPolicy (business rules)
- RefundStatus (value object)

Edge Cases:
- Partial refunds?
- Multiple refund requests?
- Refund to different payment method?

[NEEDS CLARIFICATION: Partial refunds supported?]
[NEEDS CLARIFICATION: Refund to original payment method only?]
```

**Option 2: Complex (medium/large feature)**:
Suggest:
```
This looks complex enough for full specification.

Run: /harness:specify User refund processing

This will create:
- Complete BDD specification
- Ticket-based branch
- Prioritized user stories
- Full domain model
```

## Notes

- Transforms vague → clear
- Extracts domain concepts
- Identifies edge cases
- Flags remaining ambiguities
- Suggests appropriate next command (/harness:specify or direct implementation)
