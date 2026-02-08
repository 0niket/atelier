# QA Report: [FEATURE NAME]

**Ticket**: [URL]
**Branch**: `<ticket-id>-<short-desc>`
**Date**: [DATE]
**Tester**: [USERNAME]

## Automated Test Results

### Unit Tests
- **Status**: ✅ PASS / ❌ FAIL
- **Passed**: [X/Y]
- **Coverage**: [%]

### Integration Tests
- **Status**: ✅ PASS / ❌ FAIL
- **Passed**: [X/Y]

### Contract Tests
- **Status**: ✅ PASS / ❌ FAIL / ⚠️ N/A
- **Passed**: [X/Y]

### E2E/Functional Tests
- **Status**: ✅ PASS / ❌ FAIL / ⚠️ Not Implemented
- **Passed**: [X/Y]

**Overall Automated**: [X/Y] tests passed

---

## Manual QA Results (Human-in-the-Loop)

### US-1: [Title] (P1)

#### AC-1: [Acceptance Criterion]
**Steps Executed**:
1. [Step 1]
2. [Step 2]

**Evidence**: ![Screenshot](qa-evidence/ac-1-description.png)

**Result**: ✅ PASS - [What was verified]

#### AC-2: [Acceptance Criterion]
**Steps Executed**:
1. [Step 1]

**Evidence**: ![Screenshot](qa-evidence/ac-2-description.png)

**Result**: ✅ PASS - [What was verified]

---

### US-2: [Title] (P2)

[Same structure]

---

## Coherence Validation

**Spec → Plan**:
✅ All user stories in plan
✅ All acceptance criteria in plan

**Plan → Tasks**:
✅ All plan components have tasks
✅ Domain model mapped to tasks

**Tasks → Implementation**:
✅ All [X] tasks completed (state verified)
✅ Domain model correctly applied

**Spec → Tests**:
✅ All acceptance criteria verified
  - Automated: [X] criteria
  - Manual QA: [Y] criteria
  - Total: [X+Y]/[Total] verified

**Violations**: None / [List with severity]

**Status**: ✅ FULLY COHERENT / ⚠️ VIOLATIONS PRESENT

---

## Issues Found

### Issue 1: [Description]
- **Severity**: Critical / Major / Minor
- **Found During**: [Automated tests / Manual QA / Coherence check]
- **Root Cause**: [Why it happened]
- **Fix Applied**: [What was changed]
- **Status**: ✅ Resolved / ⚠️ Pending

[Repeat for each issue]

---

## Sign-Off

**QA Status**: ✅ PASS / ❌ FAIL

**Summary**:
- Acceptance Criteria: [X/Y] verified
- Test Coverage: [%]
- Issues: [X] found, [Y] resolved
- Coherence: ✅ Aligned / ⚠️ Violations

**Approved By**: [USERNAME]
**Date**: [DATE]

**Ready for Pull Request**: Yes / No

---

## Pull Request Created

**PR**: [URL]
**Created**: [DATE]

PR includes:
- User stories summary
- Domain model overview
- Test coverage metrics
- QA evidence
- Links to spec, plan, tasks
