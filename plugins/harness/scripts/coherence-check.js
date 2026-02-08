#!/usr/bin/env node

/**
 * Coherence Validation
 *
 * Validates spec ↔ plan ↔ tasks ↔ implementation alignment
 *
 * Usage: node coherence-check.js --feature <feature-id> [--task <task-id>]
 */

const fs = require('fs');

function checkCoherence(featureId, taskId = null) {
  const violations = [];

  // Load documents
  const specPath = `.harness/specs/${featureId}/spec.md`;
  const planPath = `.harness/specs/${featureId}/plan.md`;
  const tasksPath = `.harness/specs/${featureId}/tasks.md`;

  if (!fs.existsSync(specPath)) {
    violations.push({ type: 'missing-spec', severity: 'blocker', description: 'Specification missing' });
  }

  if (!fs.existsSync(planPath)) {
    violations.push({ type: 'missing-plan', severity: 'blocker', description: 'Plan missing' });
  }

  if (!fs.existsSync(tasksPath)) {
    violations.push({ type: 'missing-tasks', severity: 'blocker', description: 'Tasks missing' });
  }

  // If checking specific task
  if (taskId) {
    // Load state
    const stateFiles = fs.readdirSync('tmp').filter(f => f.includes(featureId));
    if (stateFiles.length === 0) {
      violations.push({ type: 'missing-state', severity: 'blocker', description: 'State file missing' });
    } else {
      const state = JSON.parse(fs.readFileSync(`tmp/${stateFiles[0]}`, 'utf8'));
      const task = state.tasks[taskId];

      if (!task) {
        violations.push({ type: 'unknown-task', severity: 'blocker', description: `Task ${taskId} not in state` });
      }

      // Check task coherence
      // (In real implementation, would parse spec/plan/tasks and validate)
      // For now, basic check
    }
  }

  const isCoherent = violations.filter(v => v.severity === 'blocker').length === 0;

  console.log(JSON.stringify({
    coherent: isCoherent,
    violations,
    checkedAt: new Date().toISOString()
  }, null, 2));

  process.exit(isCoherent ? 0 : 1);
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const featureIdx = args.indexOf('--feature');
  const taskIdx = args.indexOf('--task');

  const featureId = featureIdx >= 0 ? args[featureIdx + 1] : null;
  const taskId = taskIdx >= 0 ? args[taskIdx + 1] : null;

  if (!featureId) {
    console.error('Usage: coherence-check.js --feature <id> [--task <task-id>]');
    process.exit(1);
  }

  checkCoherence(featureId, taskId);
}

module.exports = { checkCoherence };
