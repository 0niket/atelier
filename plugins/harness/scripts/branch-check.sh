#!/bin/bash

# Branch Check Hook
# Validates not on protected branch before harness commands

CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

# Protected branches
PROTECTED=("main" "master" "develop" "production")

for branch in "${PROTECTED[@]}"; do
  if [ "$CURRENT_BRANCH" = "$branch" ]; then
    echo "❌ BLOCKED: Cannot run Harness commands on protected branch '$CURRENT_BRANCH'"
    echo ""
    echo "Harness enforces branch-based workflow."
    echo "Create a feature branch first:"
    echo "  /harness:specify <your feature>"
    echo ""
    exit 1
  fi
done

exit 0
