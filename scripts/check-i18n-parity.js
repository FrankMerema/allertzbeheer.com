#!/usr/bin/env node
'use strict';

// Enforces the CLAUDE.md convention: every i18n key must exist in both
// src/app/core/i18n/nl.ts and en.ts. Keys are extracted with a regex rather
// than requiring the .ts files directly, since this repo has no ts-node/tsx
// runtime for standalone scripts.

const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'app', 'core', 'i18n');
const KEY_LINE = /^\s*'([^']+)':/;

function extractKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const keys = new Set();
  for (const line of content.split('\n')) {
    const match = KEY_LINE.exec(line);
    if (match) keys.add(match[1]);
  }
  return keys;
}

const nlKeys = extractKeys(path.join(I18N_DIR, 'nl.ts'));
const enKeys = extractKeys(path.join(I18N_DIR, 'en.ts'));

const missingInEn = [...nlKeys].filter((key) => !enKeys.has(key)).sort();
const missingInNl = [...enKeys].filter((key) => !nlKeys.has(key)).sort();

if (missingInEn.length === 0 && missingInNl.length === 0) {
  console.log(`i18n key parity OK (${nlKeys.size} keys).`);
  process.exit(0);
}

if (missingInEn.length > 0) {
  console.error(`Keys present in nl.ts but missing from en.ts:\n  ${missingInEn.join('\n  ')}`);
}
if (missingInNl.length > 0) {
  console.error(`Keys present in en.ts but missing from nl.ts:\n  ${missingInNl.join('\n  ')}`);
}
process.exit(1);
