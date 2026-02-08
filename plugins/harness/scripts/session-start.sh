#!/bin/bash

# Session Start Hook
# Displays active state files and checks branch

CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

# Check for protected branches
PROTECTED_BRANCHES=("main" "master" "develop" "production")
for branch in "${PROTECTED_BRANCHES[@]}"; do
  if [ "$CURRENT_BRANCH" = "$branch" ]; then
    echo "⚠️  WARNING: On protected branch '$CURRENT_BRANCH'"
    echo "Harness requires feature branches. Use /harness:specify to create one."
  fi
done

# Display active state files
if [ -d "tmp" ]; then
  STATE_FILES=$(find tmp -name "*.json" -type f 2>/dev/null)
  if [ -n "$STATE_FILES" ]; then
    echo ""
    echo "Active Harness Features:"
    echo "═══════════════════════"
    for file in $STATE_FILES; do
      FEATURE_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$file')).feature.id)")
      PROGRESS=$(node -e "const s=JSON.parse(require('fs').readFileSync('$file')); console.log(\`\${s.workflow.tasks.completedTasks}/\${s.workflow.tasks.totalTasks}\`)")
      CURRENT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$file')).currentTask.id)")
      echo "  $FEATURE_ID: Task $CURRENT ($PROGRESS complete)"
    done
    echo ""
  fi
fi

exit 0
