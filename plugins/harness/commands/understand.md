---
description: Learn how existing code and systems work
---

# Code Understanding

Explore and explain existing codebase components, architecture, and domain models.

## User Input

What to understand: "$ARGUMENTS"

## Workflow

### Phase 1: Scope Identification

Determine what user wants to understand:
- Specific component/class/module
- System/feature (e.g., "authentication system")
- Architecture (e.g., "how does the app structure work")
- Domain model (e.g., "what are the key entities")

### Phase 2: Code Analysis

**For Component**:
- Read source files
- Identify responsibilities
- Map dependencies
- Extract key methods/behaviors

**For System/Feature**:
- Identify related components
- Map data flow
- Trace execution paths
- Find integration points

**For Architecture**:
- Identify layers/modules
- Map component relationships
- Find architectural patterns
- Document structure

### Phase 3: Domain Model Detection

If code uses DDD patterns:

**Identify**:
- Aggregates (check for aggregate roots)
- Entities (objects with identity)
- Value Objects (immutable, no identity)
- Domain Services
- Repositories
- Domain Events

**Extract**:
- Invariants (rules enforced by aggregates)
- Ubiquitous language (domain terms used)
- Bounded contexts (if multi-domain)

### Phase 4: Generate Explanation

**High-Level** (architecture/system):
```markdown
# [System Name] Overview

## Purpose
[What this system does]

## Key Components
- **Component1**: [Responsibility]
- **Component2**: [Responsibility]

## Data Flow
[How data moves through system]

## Integration Points
- [External system 1]
- [External system 2]

## Domain Model (if DDD used)
- Aggregates: [list]
- Key entities: [list]
- Value objects: [list]
```

**Component-Level**:
```markdown
# [Component Name]

## Responsibility
[What this component does]

## Dependencies
- Uses: [other components]
- Used by: [components that depend on this]

## Key Methods
- `method1()`: [what it does]
- `method2()`: [what it does]

## Domain Role (if applicable)
- Type: Aggregate Root | Entity | Value Object | Service
- Invariants: [if aggregate]
```

**Detail-Level** (line-by-line):
- Explain implementation details
- Clarify complex logic
- Document assumptions

### Phase 5: Diagrams

Create helpful diagrams:

**Sequence Diagram** (for flows):
```
User → Controller → Service → Repository → Database
```

**Architecture Diagram** (for structure):
```
┌─────────────┐
│ Presentation│
├─────────────┤
│ Application │
├─────────────┤
│   Domain    │
├─────────────┤
│Infrastructure│
└─────────────┘
```

**Domain Model Diagram** (if DDD):
```
Cart (Aggregate)
├── CartItem (Entity)
└── uses → Money (VO)
```

### Final Output

Display comprehensive explanation with:
- High-level overview
- Component details
- Domain model (if applicable)
- Diagrams
- Code examples
- Integration points

No files created (read-only command).

## Notes

- Read-only operation (no code changes)
- Focuses on existing code understanding
- Identifies domain patterns if DDD used
- Useful for onboarding or exploring unfamiliar code
