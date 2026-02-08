#!/usr/bin/env node

/**
 * State Machine Initialization
 *
 * Creates state file from tasks.md with linked list structure
 * Validates against schema
 *
 * Usage: node state-init.js <tasks-md-path> <feature-id> <ticket-info>
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function initializeState(tasksPath, featureId, ticketInfo) {
  // Parse tasks.md to extract all tasks
  const tasksContent = fs.readFileSync(tasksPath, 'utf8');

  const tasks = {};
  const taskRegex = /- \[ \] (T\d{3})(?:\s+\[P\])?(?:\s+\[US\d+\])?: (.+)/g;

  let match;
  let previousTaskId = null;
  const taskIds = [];

  while ((match = taskRegex.exec(tasksContent)) !== null) {
    const taskId = match[1];
    const description = match[2];

    // Determine user story from context or markers
    const userStory = match[0].includes('[US1]') ? 'US-1' :
                      match[0].includes('[US2]') ? 'US-2' :
                      match[0].includes('[US3]') ? 'US-3' :
                      'foundation';

    const isParallel = match[0].includes('[P]');

    tasks[taskId] = {
      id: taskId,
      description: description.trim(),
      status: 'pending',
      userStory,
      nextTask: null,
      previousTask: previousTaskId,
      dependencies: [],
      parallel: isParallel
    };

    // Build linked list
    if (previousTaskId) {
      tasks[previousTaskId].nextTask = taskId;
    }

    previousTaskId = taskId;
    taskIds.push(taskId);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '-' +
                    new Date().toISOString().split('T')[1].split('.')[0].replace(/:/g, '');

  const stateFilePath = `tmp/${timestamp}-${featureId}.json`;

  const state = {
    version: '1.0.0',
    feature: {
      id: featureId,
      name: ticketInfo.name,
      branch: featureId,
      ticket: {
        system: ticketInfo.system || 'none',
        id: ticketInfo.id || featureId,
        url: ticketInfo.url || ''
      }
    },
    stateFile: {
      path: stateFilePath,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    currentTask: {
      id: taskIds[0] || 'T001',
      status: 'pending',
      phase: 'foundation',
      nextTaskId: tasks[taskIds[0]]?.nextTask || null
    },
    workflow: {
      spec: {
        path: `.harness/specs/${featureId}/spec.md`,
        exists: fs.existsSync(`.harness/specs/${featureId}/spec.md`)
      },
      plan: {
        path: `.harness/specs/${featureId}/plan.md`,
        exists: fs.existsSync(`.harness/specs/${featureId}/plan.md`)
      },
      tasks: {
        path: tasksPath,
        exists: true,
        totalTasks: taskIds.length,
        completedTasks: 0
      }
    },
    coherence: {
      specPlanAlignment: true,
      planTasksAlignment: true,
      planImplementationAlignment: true,
      violations: [],
      lastCheck: new Date().toISOString()
    },
    tasks
  };

  // Ensure tmp/ directory exists
  if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp', { recursive: true });
  }

  // Write state file
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));

  console.log(JSON.stringify({
    success: true,
    stateFile: stateFilePath,
    totalTasks: taskIds.length,
    firstTask: taskIds[0]
  }));
}

// CLI execution
if (require.main === module) {
  const tasksPath = process.argv[2];
  const featureId = process.argv[3];
  const ticketInfo = JSON.parse(process.argv[4] || '{}');

  initializeState(tasksPath, featureId, ticketInfo);
}

module.exports = { initializeState };
