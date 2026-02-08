#!/usr/bin/env node

/**
 * State Machine Cleanup
 *
 * Archives or deletes state file after PR merge
 *
 * Usage: node state-cleanup.js <state-file> [--archive]
 */

const fs = require('fs');
const path = require('path');

function cleanupState(stateFilePath, shouldArchive = false) {
  const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));

  if (shouldArchive) {
    // Archive to spec directory
    const archivePath = `.harness/specs/${state.feature.id}/state-archive.json`;
    fs.copyFileSync(stateFilePath, archivePath);
    console.log(`State archived to: ${archivePath}`);
  }

  // Delete from tmp/
  fs.unlinkSync(stateFilePath);

  console.log(JSON.stringify({
    success: true,
    archived: shouldArchive,
    feature: state.feature.id
  }));
}

// CLI execution
if (require.main === module) {
  const stateFile = process.argv[2];
  const shouldArchive = process.argv.includes('--archive');

  cleanupState(stateFile, shouldArchive);
}

module.exports = { cleanupState };
