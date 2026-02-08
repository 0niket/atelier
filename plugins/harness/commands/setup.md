---
description: Initialize Harness in repository (run once after plugin install)
---

# Harness Setup

Initialize the Harness development workflow in this repository.

## Workflow

### Phase 1: Constitution Setup

Check if `.harness/constitution.md` exists:

**If missing**:
1. Create `.harness/` directory
2. Copy default constitution from `${CLAUDE_PLUGIN_ROOT}/templates/constitution.md`
3. Ask user:
   ```
   Constitution created with defaults:
   - TDD: Strict (tests before code)
   - Domain Modeling: Auto-triggered for business logic
   - Branch workflow: Ticket-driven, protected branches

   Customize now? [y/N]
   ```
4. If yes: Allow inline customization
5. Save to `.harness/constitution.md`

**If exists**:
- Preserve existing constitution
- Display: "✓ Constitution already exists, preserving customizations"
- Offer to review: "View constitution? [y/N]"

### Phase 2: CLAUDE.md Setup

Check if `CLAUDE.md` exists:

**If missing**:
- Create new `CLAUDE.md` with full Harness instructions
- Copy from `${CLAUDE_PLUGIN_ROOT}/templates/claude-instructions.md`

**If exists**:
- **Non-destructive merge**:
  1. Add separator at top: `# Harness Development Workflow`
  2. Insert Harness instructions after separator
  3. Preserve ALL existing project-specific instructions below
  4. Display: "✓ CLAUDE.md updated (Harness instructions merged at top)"

### Phase 3: README.md Update

Check if `README.md` exists:

**If exists**:
- Check if "Development Workflow" section already present
- If missing:
  1. Add section (non-destructive, append or insert before License)
  2. Include:
     - Link to `.harness/constitution.md`
     - Available commands overview
     - Quick start: specify → plan → tasks → implement → qa
     - State management explanation
  3. Display: "✓ README.md updated (Development Workflow section added)"

**If missing**:
- Display warning: "⚠ No README.md found. Create one? [Y/n]"
- If yes: Create basic README with workflow section

### Phase 4: Directory Structure

Create directories:
```bash
mkdir -p .harness/specs
mkdir -p .harness/docs
mkdir -p tmp
```

Add `.gitkeep` files to empty directories.

### Phase 5: Gitignore Configuration

Check if `.gitignore` exists:

**If exists**:
- Check if `tmp/` already listed
- If missing: Append `tmp/` to .gitignore
- Check if `.harness-version` listed
- If missing: Append `.harness-version`
- Display: "✓ .gitignore updated (tmp/ added)"

**If missing**:
- Create `.gitignore` with:
  ```
  tmp/
  .harness-version
  ```

### Phase 6: Git Hooks (Optional)

Ask user:
```
Install git hooks for:
- Protected branch enforcement
- State machine validation
- Coherence checking

Install hooks? [Y/n]
```

If yes:
1. Configure `git config core.hooksPath .githooks`
2. Create `.githooks/pre-commit` with:
   - Check not on protected branch
   - Validate state machine (current task done)
   - Validate coherence
3. Create `.githooks/pre-push` with:
   - Block push to protected branches
4. Make hooks executable
5. Display: "✓ Git hooks installed"

### Phase 7: Version Tracking

Create `.harness-version` file:
```json
{
  "plugin": "harness",
  "version": "0.1.0",
  "installedAt": "<timestamp>",
  "constitutionVersion": "1.0.0"
}
```

### Final Output

Display setup summary:
```
═══════════════════════════════════════
✅ Harness Setup Complete!
═══════════════════════════════════════

Created/Updated:
✓ .harness/constitution.md
✓ CLAUDE.md (Harness instructions merged)
✓ README.md (Development Workflow added)
✓ .harness/specs/ directory
✓ .harness/docs/ directory
✓ tmp/ directory (gitignored)
✓ .gitignore (tmp/ added)
✓ Git hooks installed
✓ .harness-version

Next Steps:
1. Review constitution: .harness/constitution.md
2. Read workflow: README.md#development-workflow
3. Start first feature: /harness:specify <your feature>

Branch Workflow Enforced:
⚠ All work must happen on ticket-based feature branches
⚠ Never commit to main/master/develop
⚠ PRs created via /harness:qa after QA sign-off
```

## Notes

- Setup is **idempotent** - safe to run multiple times
- **Non-destructive** - never overwrites existing content
- **Preserves customizations** - existing constitution not replaced
- Validates git is configured properly before hook setup
