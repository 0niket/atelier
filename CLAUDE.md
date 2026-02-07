# Claude Instructions for Atelier

## Project Context

Atelier is a metawork laboratory for designing and prototyping Claude Code plugins. This is where plugin ideas get shaped, validated, and refined before distribution.

## Core Principles

1. **Validation First**: Every plugin MUST pass `claude plugin validate` before commit
2. **Examples Over Theory**: Use Atelier-specific examples, not external references
3. **Structure Over Convention**: Follow validated Claude Code plugin architecture exactly
4. **Document Decisions**: Track learnings in memory for future reference

## Setup

### First Time Setup

After cloning the repository, run the setup script to enable pre-commit hooks:

```bash
./setup-hooks.sh
```

This configures git to:
- Run plugin validation before each commit
- Prevent committing invalid plugins
- Catch errors before they reach CI

**What gets validated:**
- All staged plugins in `plugins/` directory
- Marketplace manifest (`.claude-plugin/marketplace.json`) if changed
- JSON syntax, required fields, directory structure

**Pre-commit hook will:**
- ✅ Pass if all validations succeed (allows commit)
- ❌ Fail if any validation errors (blocks commit)
- ℹ️  Show warnings but allow commit

## Plugin Development Workflow

### Creating a New Plugin

1. **Scaffold Structure**
   ```bash
   mkdir -p plugins/my-plugin/.claude-plugin
   mkdir -p plugins/my-plugin/skills
   ```

2. **Create Manifest**
   ```json
   {
     "name": "my-plugin",
     "version": "1.0.0",
     "description": "What it does",
     "author": { "name": "Atelier" }
   }
   ```

3. **Validate BEFORE Commit**
   ```bash
   claude plugin validate plugins/my-plugin
   ```

   This is **REQUIRED** - CI will reject any plugin that doesn't pass validation.

4. **Test Locally**
   ```bash
   claude --plugin-dir ./plugins/my-plugin
   ```

### Plugin Architecture Rules

**Directory Structure:**
```
plugins/my-plugin/
├── .claude-plugin/plugin.json   # Only manifest goes here
├── commands/                    # Slash commands (optional)
├── skills/                      # Agent skills (optional)
│   └── <name>/SKILL.md
├── agents/                      # Subagents (optional)
├── hooks/hooks.json             # Event handlers (optional)
├── .mcp.json                    # MCP servers (optional)
└── scripts/                     # Hook scripts (optional)
```

**Critical Rules:**
- Components go at plugin root, NOT inside `.claude-plugin/`
- Only `name` is required in plugin.json
- Use `${CLAUDE_PLUGIN_ROOT}` for paths in hooks/MCP configs
- Skills are namespaced: `/plugin-name:skill-name`

### Validation Requirements

Every plugin must:
- Have valid JSON in `.claude-plugin/plugin.json`
- Include required `name` field (kebab-case)
- Use correct directory structure
- Pass `claude plugin validate <path>` with no errors

Warnings are acceptable but should be addressed if they indicate missing best practices.

## Git Workflow

### Committing Changes

1. **Stage your changes:**
   ```bash
   git add plugins/<plugin-name>
   ```

2. **Commit (pre-commit hook runs automatically):**
   ```bash
   git commit -m "feat: add <plugin-name> plugin

   <Description of what the plugin does and why>

   Co-Authored-By: Claude Sonnet 4.5 (1M context) <noreply@anthropic.com>"
   ```

   The pre-commit hook will:
   - Validate all staged plugins
   - Validate marketplace manifest if changed
   - Block commit if validation fails
   - Show clear error messages

3. **If validation fails:**
   - Fix the errors shown in the pre-commit output
   - Stage the fixes: `git add <files>`
   - Try committing again

4. **Bypass hook (only for emergencies):**
   ```bash
   git commit --no-verify
   ```
   ⚠️ Not recommended - CI will still fail

### CI Validation (Double Check)

GitHub Actions runs on **all branches** and **all PRs** when plugin files change.

**Validates:**
- All plugins in `plugins/` directory
- Marketplace manifest if present
- JSON syntax and schema compliance

**CI will fail if:**
- Any plugin fails validation
- Invalid JSON syntax
- Missing required fields
- Incorrect directory structure

**Triggers on:**
- Push to any branch (with plugin changes)
- Pull requests to any branch (with plugin changes)

This acts as a safety net if pre-commit hook is bypassed or not installed.

## Testing Plugins

### Local Testing
```bash
# Test single plugin
claude --plugin-dir ./plugins/my-plugin

# Test multiple plugins
claude --plugin-dir ./plugins/plugin-one --plugin-dir ./plugins/plugin-two
```

### Debug Issues
```bash
# Enable debug mode
claude --debug --plugin-dir ./plugins/my-plugin

# Check plugin loading messages
# Look for: "loading plugin", component directories, errors
```

## Marketplace Distribution (Future)

When ready to distribute plugins:

1. **Create marketplace manifest:**
   ```json
   {
     "name": "atelier-plugins",
     "owner": { "name": "Atelier" },
     "plugins": [
       { "name": "plugin-name", "source": "./plugins/plugin-name" }
     ]
   }
   ```

2. **Validate marketplace:**
   ```bash
   claude plugin validate .
   ```

3. **Version and tag:**
   ```bash
   git tag -a v1.0.0 -m "Release: <plugin-name> v1.0.0"
   git push origin v1.0.0
   ```

## Common Mistakes to Avoid

1. ❌ Putting components inside `.claude-plugin/` directory
2. ❌ Using absolute paths instead of `${CLAUDE_PLUGIN_ROOT}`
3. ❌ Forgetting to validate before commit
4. ❌ Using generic examples instead of Atelier-specific ones
5. ❌ Committing plugins that fail validation

## References

- [Official Plugin Guide](https://code.claude.com/docs/en/plugins)
- [Plugin Reference](https://code.claude.com/docs/en/plugins-reference)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- Local memory: `/Users/aniket/.claude/projects/-Users-aniket-experiments-atelier/memory/`
