#!/usr/bin/env node
import { execSync } from 'child_process';
import chalk from 'chalk';

const args = process.argv.slice(2);
const command = args[0];

const commands = {
  introspect: 'npm run introspect',
  map: 'npm run generate-map',
  'generate-map': 'npm run generate-map',
  fetch: 'npm run fetch-content',
  docs: 'npm run docs',
  all: 'npm run context-docs',
};

const run = (cmd) => {
  console.log(chalk.cyan(`\n→ Running: ${cmd}\n`));
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(chalk.red(`\n✖ Command failed:`), error.message);
    process.exit(1);
  }
};

// Display help if no command or invalid one
if (!command || !commands[command]) {
  console.log(
    chalk.yellow(`
🧩 Contentful Context Toolkit CLI

Usage:
  npm run context <command>

Commands:
  introspect     Fetch schema from Contentful
  map            Generate content type map
  fetch          Fetch sample content entries
  docs           Build Markdown schema documentation
  all            Run full context-docs pipeline

Examples:
  npm run context introspect
  npm run context fetch
  npm run context all
  `)
  );
  process.exit(0);
}

// Execute the matching command
run(commands[command]);
