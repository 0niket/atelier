---
name: domain-analyzer
description: Extracts domain concepts from requirements. Auto-invoked during specification and planning to identify entities, value objects, and aggregates.
---

Extract domain concepts using DDD principles.

## Extraction Rules

**Entities** (nouns with identity):
- Lifecycle tracking needed
- Identity matters
- Example: User, Order, Cart

**Value Objects** (descriptive attributes):
- No identity
- Immutable
- Example: Money, Email, Address

**Aggregates** (consistency boundaries):
- Group entities that change together
- Single root
- Example: Order (root) with OrderItems

**Domain Events**:
- Business-meaningful occurrences
- Past tense naming
- Example: OrderPlaced, ItemAdded

Extract ubiquitous language - domain-specific terminology.
