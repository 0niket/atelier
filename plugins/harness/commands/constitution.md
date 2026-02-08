---
description: View or customize project constitution
---

# Constitution Management

View and customize the project's development constitution.

## Workflow

### Phase 1: Display Current Constitution

Load and display `.harness/constitution.md`:

Show:
- Branch workflow rules
- Methodology enforcement (TDD, DDD, refactoring)
- Quality gates
- Coherence rules
- State management requirements

### Phase 2: Customization (Optional)

If user provides customization argument ($ARGUMENTS):

**Parse request**:
- "Disable domain modeling" → Remove DDD requirement
- "Make TDD optional" → Change TDD from required to suggested
- "Allow commits to main" → Remove protected branch enforcement (NOT RECOMMENDED)

**Validate change**:
- Ensure doesn't break coherence framework
- Warn if weakening quality standards
- Block if would prevent state machine operation

**Update constitution**:
- Apply changes to `.harness/constitution.md`
- Display what changed
- Save file

**Example**:
```
Constitution Updated
═══════════════════

Changed:
- Domain Modeling: Required → Optional (triggered only for complex features)

Warning:
⚠️ Domain modeling helps manage complexity. Consider keeping it for business logic.

Constitution saved: .harness/constitution.md
```

### Phase 3: Display Summary

Show key enforcement rules:
```
Constitution Summary
═══════════════════

Branch Workflow:
✓ Ticket-driven branches required
✓ Protected branches: main, master, develop
✓ All changes via PR

Methodologies:
✓ TDD: Required (tests before code)
✓ Domain Modeling: Required for business logic
✓ Refactoring: Continuous (during refactor phase)
✓ State Machine: Strict task order

Quality Gates:
✓ QA required before PR
✓ All acceptance criteria must be tested
✓ Coherence validation continuous
```

## Notes

- Constitution is customizable
- Some rules are core to Harness (e.g., state machine)
- Weakening standards should be deliberate choice
- Constitution is version controlled (team sees changes)
