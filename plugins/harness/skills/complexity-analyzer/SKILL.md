---
name: complexity-analyzer
description: Assesses task complexity to determine if spec/plan/tasks needed. Auto-invoked at start of any job.
---

Assess task complexity (qualitative, no time estimates).

## Signals

**File Impact**:
- Affects > 5 files → likely medium/large
- Affects 2-5 files → likely small/medium
- Affects 1 file → likely trivial/small

**Business Logic**:
- Multiple business rules → medium/large
- State transitions → medium/large
- Complex calculations → medium

**Domain Complexity**:
- Domain terminology present → needs DDD
- Multiple entities → needs modeling

## Classifications

- **Trivial**: Single file, no business logic, obvious fix
- **Small**: Few files, simple logic, clear approach
- **Medium**: Multiple files, business logic, needs planning
- **Large**: System-level, complex domain, full workflow needed

## Recommendations

- Trivial: Direct implementation (no spec/plan)
- Small: Inline spec, checklist
- Medium: Full spec + plan + tasks
- Large: Full workflow, consider splitting

No time estimates - only complexity indicators.
