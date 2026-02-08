#!/usr/bin/env node

/**
 * State Machine Resume
 *
 * Loads state and displays resumption info
 *
 * Usage: node state-resume.js <state-file>
 */

const fs = require('fs');

function resumeState(stateFilePath) {
  const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));

  const currentTask = state.tasks[state.currentTask.id];
  const progress = `${state.workflow.tasks.completedTasks}/${state.workflow.tasks.totalTasks}`;

  console.log(JSON.stringify({
    feature: state.feature,
    progress,
    currentTask: {
      id: state.currentTask.id,
      description: currentTask?.description,
      status: state.currentTask.status,
      tddPhase: state.currentTask.tddPhase,
      userStory: currentTask?.userStory
    },
    nextTask: {
      id: state.currentTask.nextTaskId,
      description: state.tasks[state.currentTask.nextTaskId]?.description
    },
    coherence: state.coherence
  }, null, 2));
}

// CLI execution
if (require.main === module) {
  const stateFile = process.argv[2];
  resumeState(stateFile);
}

module.exports = { resumeState };
