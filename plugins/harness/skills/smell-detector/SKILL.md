---
name: smell-detector
description: Detects code smells using Fowler's catalog. Auto-invoked during refactoring and post-Green phase.
---

Detect code smells from Martin Fowler's catalog (2018 edition).

## Smells to Detect

- Long Method (> 20 lines)
- Large Class (> 200 lines)
- Long Parameter List (> 3 params)
- Feature Envy (accessing other class data excessively)
- Data Clumps (same group of data together)
- Primitive Obsession (using primitives instead of domain objects)
- Duplicate Code
- Dead Code

Prioritize by impact and suggest specific refactorings.
