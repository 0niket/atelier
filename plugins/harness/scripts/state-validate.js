#!/usr/bin/env node

/**
 * State Machine Validation
 *
 * Validates state file against schema
 *
 * Usage: node state-validate.js <state-file> <schema-file>
 * Exit code: 0 = valid, 1 = invalid
 */

const fs = require('fs');
const yaml = require('js-yaml');

function validateState(stateFilePath, schemaPath) {
  const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
  const schema = yaml.load(fs.readFileSync(schemaPath, 'utf8'));

  const errors = [];

  // Validate required fields
  if (!state.version) errors.push('Missing required field: version');
  if (!state.feature) errors.push('Missing required field: feature');
  if (!state.currentTask) errors.push('Missing required field: currentTask');
  if (!state.workflow) errors.push('Missing required field: workflow');
  if (!state.coherence) errors.push('Missing required field: coherence');
  if (!state.tasks) errors.push('Missing required field: tasks');

  // Validate version
  if (state.version !== '1.0.0') {
    errors.push(`Invalid version: ${state.version} (expected 1.0.0)`);
  }

  // Validate currentTask structure
  if (state.currentTask) {
    if (!state.currentTask.id) errors.push('currentTask.id required');
    if (!state.currentTask.status) errors.push('currentTask.status required');

    const validStatuses = ['pending', 'in-progress', 'red', 'green', 'refactor', 'done', 'all_complete'];
    if (!validStatuses.includes(state.currentTask.status)) {
      errors.push(`Invalid currentTask.status: ${state.currentTask.status}`);
    }
  }

  // Validate linked list integrity
  if (state.tasks) {
    for (const taskId in state.tasks) {
      const task = state.tasks[taskId];

      if (!task.id) errors.push(`Task ${taskId}: missing id`);
      if (!task.description) errors.push(`Task ${taskId}: missing description`);
      if (!task.status) errors.push(`Task ${taskId}: missing status`);

      // Check nextTask exists in tasks (unless null)
      if (task.nextTask && task.nextTask !== 'null' && !state.tasks[task.nextTask]) {
        errors.push(`Task ${taskId}: nextTask ${task.nextTask} not found`);
      }

      // Check previousTask exists (unless null)
      if (task.previousTask && task.previousTask !== 'null' && !state.tasks[task.previousTask]) {
        errors.push(`Task ${taskId}: previousTask ${task.previousTask} not found`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(JSON.stringify({
      valid: false,
      errors
    }, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({
    valid: true,
    message: 'State file valid'
  }));
  process.exit(0);
}

// CLI execution
if (require.main === module) {
  const stateFile = process.argv[2];
  const schemaFile = process.argv[3] || `${__dirname}/../schemas/state-machine.yaml`;

  validateState(stateFile, schemaFile);
}

module.exports = { validateState };
