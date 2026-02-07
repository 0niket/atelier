# Atelier

**Atelier** (noun, from French): A workshop or studio, especially one used by an artist or designer; a place where creative work and craftsmanship happen.

## Purpose

Atelier is a metawork laboratory for designing and prototyping Claude Code plugins. Ideas get shaped here before they ship as distributable plugins.

## Getting Started

### First Time Setup

After cloning this repository, install the git hooks:

```bash
./setup-hooks.sh
```

This enables automatic plugin validation before commits.

## Claude Code Plugin Reference

### Plugin Structure

A Claude Code plugin is a directory with a manifest and optional components:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json            # Manifest (only `name` is required)
├── commands/                  # Slash commands as Markdown files
├── skills/                    # Agent skills: <name>/SKILL.md
│   └── review/
│       └── SKILL.md
├── agents/                    # Subagent definitions as Markdown
├── hooks/
│   └── hooks.json             # Event handlers
├── .mcp.json                  # MCP server configs
├── .lsp.json                  # LSP server configs
└── scripts/                   # Utility scripts for hooks
```

Components go at the plugin root, **not** inside `.claude-plugin/`.

### Manifest (`plugin.json`)

Only `name` (kebab-case) is required. Everything else is optional:

```json
{
  "name": "atelier-review",
  "version": "1.0.0",
  "description": "Code review patterns from the Atelier workshop",
  "author": { "name": "Atelier" },
  "keywords": ["review", "patterns"],
  "license": "MIT"
}
```

Component path fields (`commands`, `agents`, `skills`, `hooks`, `mcpServers`, `lspServers`) supplement default directories - they don't replace them. All paths must be relative, starting with `./`.

### Skills vs Commands

| Type | Location | Invocation | Best For |
|------|----------|------------|----------|
| Commands | `commands/hello.md` | `/plugin:hello` | User-invoked slash commands |
| Skills | `skills/review/SKILL.md` | Automatic by context | Model-invoked capabilities |

Skills need frontmatter with `name` and `description`. Commands are plain Markdown with optional `$ARGUMENTS` for user input.

### Hooks

Defined in `hooks/hooks.json`. Use `${CLAUDE_PLUGIN_ROOT}` for paths:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/lint.sh"
          }
        ]
      }
    ]
  }
}
```

Available events: `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `Notification`, `Stop`, `SubagentStart`, `SubagentStop`, `TeammateIdle`, `TaskCompleted`, `PreCompact`.

Hook types: `command` (shell), `prompt` (LLM evaluation), `agent` (agentic verifier).

### Installation Scopes

| Scope | Settings File | Use Case |
|-------|--------------|----------|
| `user` | `~/.claude/settings.json` | Personal, all projects (default) |
| `project` | `.claude/settings.json` | Team, version controlled |
| `local` | `.claude/settings.local.json` | Project-specific, gitignored |

```bash
claude plugin install my-plugin@marketplace -s project
```

### Marketplace Distribution

A marketplace is a Git repo with `.claude-plugin/marketplace.json`:

```json
{
  "name": "atelier-plugins",
  "owner": { "name": "Atelier" },
  "plugins": [
    {
      "name": "atelier-review",
      "source": "./plugins/atelier-review",
      "description": "Code review patterns"
    }
  ]
}
```

Sources: relative paths (Git-based marketplaces only), GitHub repos (`"source": "github", "repo": "owner/repo"`), or Git URLs.

### Key Facts

- Plugin skills are namespaced: `/atelier-review:check`
- Plugins are cached on install - can't reference files outside their directory
- Test locally: `claude --plugin-dir ./my-plugin`
- Validate: `claude plugin validate .`
- Standalone `.claude/` config uses short names (`/hello`); plugins use namespaced names

### References

- [Plugins Guide](https://code.claude.com/docs/en/plugins)
- [Plugins Reference](https://code.claude.com/docs/en/plugins-reference)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)

---
