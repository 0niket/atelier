---
description: Systematically refactor code using Fowler's catalog
---

# Code Improvement (Refactoring)

Improve code quality by systematically applying Martin Fowler's refactoring catalog.

## User Input

Code to improve: "$ARGUMENTS"

## Workflow

### Phase 1: Smell Detection

Analyze specified code for code smells:

**Fowler's Catalog**:
- Long Method
- Large Class
- Long Parameter List
- Divergent Change
- Shotgun Surgery
- Feature Envy
- Data Clumps
- Primitive Obsession
- Switch Statements
- Duplicate Code
- Dead Code

Display detected smells with severity and location.

### Phase 2: Refactoring Specification

Create mini-spec: `.harness/specs/refactor-<id>/spec.md`

```markdown
# Refactoring: [Component Name]

## Current State

**Code Smells Identified**:
- Long Method: calculateTotal() is 150 lines
- Feature Envy: OrderProcessor accessing Cart internals
- Primitive Obsession: Passing raw numbers for Money

## Desired State

Clean code with:
- Single Responsibility methods
- Proper encapsulation
- Domain model adherence

## Acceptance Criteria

- All tests pass (behavior preserved)
- No Long Method smell
- Proper encapsulation (no Feature Envy)
- Domain concepts (Money) used instead of primitives
```

### Phase 3: Refactoring Plan

Create `.harness/specs/refactor-<id>/plan.md`:

```markdown
# Refactoring Plan

## Smells & Refactorings

### Smell 1: Long Method (calculateTotal, 150 lines)
**Refactoring**: Extract Method
**Sequence**:
1. Extract discount calculation
2. Extract tax calculation
3. Extract subtotal calculation

### Smell 2: Feature Envy
**Refactoring**: Move Method
**Sequence**:
1. Move calculateSubtotal() to Cart class

### Smell 3: Primitive Obsession
**Refactoring**: Introduce Parameter Object
**Sequence**:
1. Create Money value object (if not exists)
2. Replace number parameters with Money
3. Update all callers

## Refactoring Sequence (ORDER MATTERS)

1. Extract Method (discount) → test → commit
2. Extract Method (tax) → test → commit
3. Extract Method (subtotal) → test → commit
4. Move Method (to Cart) → test → commit
5. Introduce Money VO → test → commit

## Test Coverage

Current: 85%
Required: Must not decrease (maintain or increase)
```

### Phase 4: Test Coverage Check

**Verify tests exist**:
- Check test files for code being refactored
- If coverage < 80%: WARN and suggest adding tests first
- If no tests: STOP and require tests before refactoring

Display:
```
Test Coverage Check
═══════════════════

OrderProcessor.ts: 85% coverage
Tests exist: ✅

Ready to refactor safely.
```

### Phase 5: Systematic Refactoring

For each refactoring in sequence:

**Before refactoring**:
1. Run tests (establish baseline - all must pass)
2. Display: "Baseline: All tests green ✅"

**Apply one refactoring**:
- Follow Fowler's pattern exactly
- Make ONE transformation
- Example: Extract Method
  ```
  Applying: Extract Method
  Method: extractDiscountCalculation()
  From: calculateTotal()
  Lines: 45-67
  ```

**After refactoring**:
1. Run tests immediately
2. **If tests pass**: ✅ Refactoring safe
3. **If tests fail**: ❌ Rollback, investigate

**Commit** (atomic per refactoring):
```bash
git add <affected-files>
git commit -m "refactor: extract discount calculation method

Apply Fowler's Extract Method pattern to reduce Long Method smell.

Smell: Long Method (calculateTotal 150 lines)
Refactoring: Extract Method
Tests: All passing (behavior preserved)

Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"
```

**Continue** to next refactoring in sequence.

### Phase 6: Final Verification

After all refactorings:

**Check smells resolved**:
- Re-run smell detection
- Verify original smells gone
- Check for new smells introduced

**Validate**:
- [ ] All tests passing
- [ ] Original smells resolved
- [ ] No new smells introduced
- [ ] Code cleaner and more maintainable
- [ ] Domain model coherence maintained

Display:
```
Refactoring Complete
═══════════════════

Smells Resolved:
✅ Long Method (calculateTotal now 20 lines)
✅ Feature Envy (methods moved to Cart)
✅ Primitive Obsession (Money VO introduced)

Tests: All passing ✅
Coverage: 87% (increased from 85%)

Commits: 5 atomic refactorings
```

## Notes

- Refactoring requires tests FIRST
- Apply ONE refactoring at a time
- Test after EACH refactoring
- Commit atomically (one refactoring = one commit)
- Order matters (follow Fowler's guidance)
- Behavior preservation critical (tests ensure this)
