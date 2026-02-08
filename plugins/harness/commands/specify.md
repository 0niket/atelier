---
description: Create BDD feature specification with ticket-based branch
---

# Feature Specification

Create a Behavior-Driven Development (BDD) specification for a new feature with ticket tracking and feature branch.

## User Input

```text
$ARGUMENTS
```

Feature description: "$ARGUMENTS"

## Workflow

### Phase 1: Ticket & Branch

**Step 1: Request Ticket**

Ask user:
```
Which ticket are you working on?

Please provide:
- ClickUp: Task URL or ID (e.g., https://app.clickup.com/t/86c6paqmv or 86c6paqmv)
- Jira: Issue URL or key (e.g., https://company.atlassian.net/browse/PROJ-123 or PROJ-123)
- GitHub: Issue URL or number (e.g., https://github.com/owner/repo/issues/456 or #456)
- None: Press enter to continue without ticket
```

**Step 2: Fetch Ticket Details** (if provided)

If ticket URL/ID provided:
- **ClickUp**: Use `mcp__clickup-http__execute_code` to fetch task details
- **Jira**: Use Jira MCP (if available) or parse from URL
- **GitHub**: Use `gh issue view <number>` to fetch details

Extract:
- Title
- Description
- Acceptance criteria (if present in ticket)
- Status
- Assignee

**Step 3: Generate Branch Name**

From feature description (or ticket title), create short name (2-4 words):
- Extract meaningful keywords
- Convert to kebab-case
- Examples:
  - "Add user authentication" → "user-authentication"
  - "Fix payment timeout" → "payment-timeout"
  - "Shopping cart feature" → "shopping-cart"

**Step 4: Create Branch**

Branch pattern: `<ticket-id>-<short-desc>`

Examples:
- ClickUp: `86c6paqmv-shopping-cart`
- Jira: `PROJ-123-shopping-cart`
- GitHub: `456-shopping-cart`
- No ticket: `feature-001-shopping-cart` (auto-number from existing specs)

Create and switch:
```bash
git checkout -b <ticket-id>-<short-desc>
```

Verify not on protected branch (main/master/develop).

**Step 5: Create Spec Directory**

```bash
mkdir -p .harness/specs/<ticket-id>-<short-desc>
```

### Phase 2: User Story Prioritization

Interview developer about feature with these questions:

1. "What are the key user capabilities this feature provides?"
2. "Which capability is most critical? (This becomes P1/MVP)"
3. "Can P1 ship alone and deliver value?"
4. "What are nice-to-have enhancements? (P2, P3)"

Create **prioritized user stories**:
- **P1** (Priority 1): MVP - must deliver standalone value
- **P2** (Priority 2): Enhancement - improves P1 but P1 works without it
- **P3** (Priority 3): Nice-to-have - optional additions

**Critical**: Each story MUST be independently testable.

Test: "If we implement ONLY P1, do we have a viable product?"

### Phase 3: Acceptance Scenarios

For each user story, create Given-When-Then scenarios:

**Format**:
```markdown
### US-1: [Title] (Priority: P1) 🎯 MVP

**Why P1**: [Explain why this is core value]

**Independent Test**: [How to test this story alone]

**Acceptance Scenarios**:
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]
```

Map each scenario to future test case.

Identify edge cases:
- Boundary conditions
- Error scenarios
- Invalid inputs

### Phase 4: Domain Concepts (Preliminary DDD)

Extract domain concepts from user stories:

**Entities** (have identity):
- Look for nouns that have lifecycle
- Example: User, Order, Cart

**Value Objects** (no identity):
- Look for descriptive attributes
- Example: Money, Address, Email

**Aggregates** (consistency boundaries):
- Group entities that must change together
- Example: Cart (aggregate) contains CartItems

**Ubiquitous Language**:
- Define domain-specific terms
- Example: "Cart" not "ShoppingBasket", "Money" not "Price"

**Domain Events**:
- Business-meaningful occurrences
- Example: ItemAdded, OrderPlaced, PaymentCompleted

### Phase 5: Requirements & Success Criteria

**Functional Requirements**:
- **FR-001**: System MUST [capability]
- **FR-002**: System MUST [capability]
- Format: Testable, specific, measurable

Mark uncertainties (max 3):
- `[NEEDS CLARIFICATION: specific question]`
- Only for critical ambiguities
- Will be resolved in planning phase

**Success Criteria** (Measurable):
- **SC-001**: [Metric, e.g., "Users complete checkout in < 30 seconds"]
- **SC-002**: [Metric, e.g., "Zero cart calculation errors"]
- Technology-agnostic, measurable outcomes

### Phase 6: Specification Document

Create `.harness/specs/<ticket-id>-<short-desc>/spec.md`:

**Template Structure**:
```markdown
# Feature Specification: [Name]

**Ticket**: [URL or ID]
**Branch**: <ticket-id>-<short-desc>
**Created**: <date>
**Status**: Draft

## User Stories (Prioritized, Independently Testable)

### US-1: [Title] (Priority: P1) 🎯 MVP
[Full story with scenarios]

### US-2: [Title] (Priority: P2)
[Full story with scenarios]

### US-3: [Title] (Priority: P3)
[Full story with scenarios]

## Functional Requirements
- FR-001, FR-002, ...

## Domain Model (Preliminary)
- Entities, Value Objects, Aggregates

## Edge Cases

## Success Criteria

## Uncertainties
[NEEDS CLARIFICATION: ...] (max 3)
```

### Final Output

Display:
```
═══════════════════════════════════════
✅ Specification Created!
═══════════════════════════════════════

Ticket: <ticket-url>
Branch: <ticket-id>-<short-desc> (checked out)
Spec: .harness/specs/<ticket-id>-<short-desc>/spec.md

User Stories:
- US-1 (P1) 🎯 MVP: [title]
- US-2 (P2): [title]
- US-3 (P3): [title]

Domain Concepts:
- [Entity1], [Entity2], [ValueObject1]

Next Steps:
1. Review spec: .harness/specs/<ticket-id>-<short-desc>/spec.md
2. Create plan: /harness:plan
```

## Notes

- User stories MUST be independently testable
- P1 alone should be shippable MVP
- Branch created from ticket ID (not auto-numbered)
- Ticket details incorporated if available
- Domain concepts are preliminary (refined in planning)
