#!/bin/bash

# Setup script for Atelier git hooks
# Run this after cloning the repository to enable pre-commit validation

set -e

echo ""
echo "🔧 Setting up Atelier git hooks..."
echo ""

# Configure git to use .githooks directory
if git config core.hooksPath .githooks; then
    echo "✅ Git hooks configured to use .githooks/"
else
    echo "❌ Failed to configure git hooks"
    exit 1
fi

# Verify the pre-commit hook exists and is executable
if [ -x ".githooks/pre-commit" ]; then
    echo "✅ Pre-commit hook is executable"
else
    echo "⚠️  Making pre-commit hook executable..."
    chmod +x .githooks/pre-commit
    echo "✅ Pre-commit hook is now executable"
fi

# Check if claude is installed
if command -v claude &> /dev/null; then
    echo "✅ Claude Code CLI is installed"
else
    echo ""
    echo "⚠️  WARNING: Claude Code CLI not found"
    echo ""
    echo "Pre-commit hooks require Claude Code to be installed."
    echo "Install it with:"
    echo "  npm install -g @anthropic-ai/claude-code"
    echo ""
fi

echo ""
echo "=========================================="
echo "✅ Git hooks setup complete!"
echo "=========================================="
echo ""
echo "Pre-commit validation is now enabled."
echo "Plugins will be validated before each commit."
echo ""
