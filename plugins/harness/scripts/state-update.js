#!/usr/bin/env node

/**
 * State Machine Update
 *
 * Updates state after task completion, moves to next task
 * Validates coherence
 *
 * Usage: node state-update.js <state-file> <task-id> <status> [tdd-phase]
 */

const fs = require('fs');

function updateState(stateFilePath, taskId, status, tddPhase) {
  // Load current state
  const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));

  // Update task
  if (state.tasks[taskId]) {
    state.tasks[taskId].status = status;

    if (tddPhase) {
      state.tasks[taskId].tddPhase = tddPhase;
    }

    if (status === 'done') {
      state.tasks[taskId].completedAt = new Date().toISOString();
      state.workflow.tasks.completedTasks++;

      // Move to next task
      const nextTaskId = state.tasks[taskId].nextTask;

      if (nextTaskId) {
        state.currentTask = {
          id: nextTaskId,
          status: 'pending',
          phase: determinePhase(state.tasks[nextTaskId].userStory),
          nextTaskId: state.tasks[nextTaskId].nextTask
        };
      } else {
        // All tasks complete
        state.currentTask = {
          id: null,
          status: 'all_complete',
          phase: 'qa',
          nextTaskId: null
        };
      }
    } else {
      // Update current task status
      state.currentTask.status = status;
      if (tddPhase) {
        state.currentTask.tddPhase = tddPhase;
      }
    }
  }

  state.stateFile.lastUpdated = new Date().toISOString();
  state.coherence.lastCheck = new Date().toISOString();

  // Save updated state
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));

  console.log(JSON.stringify({
    success: true,
    taskId,
    status,
    nextTask: state.currentTask.id,
    completedTasks: state.workflow.tasks.completedTasks,
    totalTasks: state.workflow.tasks.totalTasks
  }));
}

function determinePhase(userStory) {
  if (userStory === 'foundation') return 'foundation';
  if (userStory.startsWith('US-')) return 'user-story';
  return 'polish';
}

// CLI execution
if (require.main === module) {
  const stateFile = process.argv[2];
  const taskId = process.argv[3];
  const status = process.argv[4];
  const tddPhase = process.argv[5];

  updateState(stateFile, taskId, status, tddPhase);
}

module.exports = { updateState };
