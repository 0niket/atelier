---
description: Investigate and debug production issues
---

# Production Debugging

Systematically investigate production issues with root cause analysis.

## User Input

Issue description: "$ARGUMENTS"

## Workflow

### Phase 1: Context Gathering

Collect information:
- Error messages
- Stack traces
- Logs (application, system, database)
- When issue started
- Affected users/scenarios
- Reproduction steps (if known)

Ask user for additional context if needed.

### Phase 2: Root Cause Analysis

**Hypothesis Generation**:
1. List potential causes based on symptoms
2. Prioritize by likelihood
3. For each hypothesis:
   - What evidence would confirm?
   - What evidence would refute?

**Systematic Investigation**:
- Check recent deployments (git log)
- Examine logs for patterns
- Analyze stack traces
- Review monitoring/metrics
- Test hypotheses

**Git Bisect** (if needed):
```bash
git bisect start
git bisect bad <current-commit>
git bisect good <last-known-good>
# Binary search for problematic commit
```

**Document findings**:
- Root cause with evidence
- Why it happened
- Impact scope

### Phase 3: Fix Decision

Determine fix approach:

**Immediate Hotfix** (if critical):
- Minimal change to stop bleeding
- Plan proper fix later

**Proper Fix** (if time allows):
- Address root cause completely
- Follow full workflow (spec, plan, tasks, TDD)

Ask user:
```
Root cause identified: [cause]

Fix approach:
1. Hotfix (minimal, fast) - for critical issues
2. Proper fix (spec+plan+TDD) - for thorough solution

Which approach? [1/2]
```

### Phase 4A: Hotfix Path

If hotfix chosen:

1. Create bugfix branch: `hotfix-<ticket-id>-<desc>`
2. Write minimal test reproducing issue
3. Fix with smallest possible change
4. Verify fix works
5. Create PR immediately
6. Document "TODO: Proper fix needed" in code

### Phase 4B: Proper Fix Path

If proper fix chosen:

Delegate to `/harness:bugfix`:
- Creates full bug specification
- Creates fix plan with root cause
- Creates tasks
- Implements with TDD
- QA validation
- Creates PR

### Final Output

For hotfix:
```
═══════════════════════════════════════
✅ Hotfix Ready
═══════════════════════════════════════

Root Cause: [cause]
Fix: [minimal change]
Tests: Passing ✅

PR created for immediate deployment

⚠️ TODO: Proper fix needed (tracked in [ticket])
```

For proper fix:
```
Root cause documented. Running /harness:bugfix workflow...
[Delegates to bugfix command]
```

## Notes

- Systematic investigation (not random trying)
- Root cause MUST be identified with evidence
- Hotfix for critical issues only
- Proper fix follows full TDD workflow
- Git bisect useful for regression issues
