#!/usr/bin/env node

/**
 * SolidTrack legal text check (SE-4140)
 *
 * The /solidtrack/privacy and /solidtrack/terms pages must carry the app's own text word for word.
 * This script reads the two in-app screens with `git show` (read-only, the checkout is never
 * modified) and compares the title, "last updated" date, intro, and every section heading and
 * paragraph with src/data/solidtrackLegal.js. It also checks that the support email on the site
 * is the one in the app's production config.
 *
 * Usage:
 *   SOLIDTRACK_APP_REPO="/path/to/workout_tracker" node scripts/checkSolidtrackLegal.js
 *   SOLIDTRACK_APP_REF=origin/develop is the default; set it to compare against another ref.
 *
 * Not part of the build. Exits 0 when everything matches or when SOLIDTRACK_APP_REPO is unset
 * (skipped), and 1 on any difference.
 */

import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { LEGAL_PAGES, SOLIDTRACK } from '../src/data/solidtrackLegal.js';

const SCREENS = {
  privacy: 'lib/features/user/screens/privacy_policy_screen.dart',
  terms: 'lib/features/user/screens/terms_conditions_screen.dart',
};
const PRODUCTION_CONFIG = 'lib/core/config/production_config.dart';

const ESCAPES = { n: '\n', t: '\t', r: '\r', "'": "'", '"': '"', '\\': '\\', $: '$' };

/** Reads one Dart string literal starting at src[i] (a quote). Returns { value, next }. */
function readLiteral(src, i) {
  const quote = src[i];
  let value = '';
  let j = i + 1;
  while (j < src.length && src[j] !== quote) {
    const ch = src[j];
    if (ch === '\\') {
      const esc = src[j + 1];
      if (!(esc in ESCAPES)) throw new Error(`Unsupported Dart escape \\${esc} near: ${src.slice(j - 20, j + 20)}`);
      value += ESCAPES[esc];
      j += 2;
    } else if (ch === '$') {
      throw new Error(`Dart interpolation is not supported near: ${src.slice(j - 20, j + 20)}`);
    } else {
      value += ch;
      j += 1;
    }
  }
  if (j >= src.length) throw new Error('Unterminated Dart string literal');
  return { value, next: j + 1 };
}

function skipSpace(src, i) {
  let j = i;
  while (j < src.length) {
    if (/\s/.test(src[j])) j += 1;
    else if (src.startsWith('//', j)) j = src.indexOf('\n', j) === -1 ? src.length : src.indexOf('\n', j);
    else break;
  }
  return j;
}

/** Reads one or more adjacent string literals ('a' 'b' is one string in Dart). */
function readConcatenated(src, i) {
  let j = skipSpace(src, i);
  if (src[j] !== "'" && src[j] !== '"') throw new Error(`Expected a string literal near: ${src.slice(j, j + 40)}`);
  let value = '';
  while (src[j] === "'" || src[j] === '"') {
    const lit = readLiteral(src, j);
    value += lit.value;
    j = skipSpace(src, lit.next);
  }
  return { value, next: j };
}

function readNamed(src, name, from) {
  const re = new RegExp(`\\b${name}:`, 'g');
  re.lastIndex = from;
  const m = re.exec(src);
  if (!m) throw new Error(`Argument "${name}:" not found`);
  return readConcatenated(src, m.index + m[0].length);
}

/** Parses a LegalDocumentScreen(...) screen into { title, lastUpdated, intro, sections: [{ heading, body }] }. */
export function parseLegalScreen(source) {
  const start = source.search(/return\s+const\s+LegalDocumentScreen\(/);
  if (start === -1) throw new Error('LegalDocumentScreen( call not found');
  const title = readNamed(source, 'title', start).value;
  const lastUpdated = readNamed(source, 'lastUpdated', start).value;
  const intro = readNamed(source, 'intro', start).value;

  const secIdx = source.indexOf('sections:', start);
  if (secIdx === -1) throw new Error('sections: not found');
  let i = source.indexOf('[', secIdx) + 1;
  const sections = [];
  for (;;) {
    i = skipSpace(source, i);
    while (source[i] === ',') i = skipSpace(source, i + 1);
    if (source[i] === ']') break;
    if (!source.startsWith('LegalSection(', i)) throw new Error(`Unexpected content in sections near: ${source.slice(i, i + 40)}`);
    i += 'LegalSection('.length;
    const heading = readConcatenated(source, i);
    i = skipSpace(source, heading.next);
    if (source[i] !== ',') throw new Error(`Expected "," after heading "${heading.value}"`);
    const body = readConcatenated(source, i + 1);
    i = skipSpace(source, body.next);
    if (source[i] === ',') i = skipSpace(source, i + 1);
    if (source[i] !== ')') throw new Error(`Expected ")" after section "${heading.value}"`);
    i += 1;
    sections.push({ heading: heading.value, body: body.value });
  }
  return { title, lastUpdated, intro, sections };
}

function gitShow(repo, ref, file) {
  return execFileSync('git', ['-C', repo, 'show', `${ref}:${file}`], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
}

// Long texts are shown as a snippet around the first difference.
function snippet(text, at) {
  const from = Math.max(0, at - 50);
  return `${from > 0 ? '...' : ''}${JSON.stringify(text.slice(from, at + 50))}${at + 50 < text.length ? '...' : ''}`;
}

function compare(label, web, app, problems) {
  if (web === app) return;
  let at = 0;
  while (at < web.length && at < app.length && web[at] === app[at]) at += 1;
  problems.push(`${label} (first difference at character ${at})\n    web: ${snippet(web, at)}\n    app: ${snippet(app, at)}`);
}

function checkPage(key, app, problems) {
  const page = LEGAL_PAGES[key];
  const tag = `[${key}]`;
  compare(`${tag} page title`, page.title, app.title, problems);
  compare(`${tag} last updated`, SOLIDTRACK.updated, app.lastUpdated, problems);
  compare(`${tag} intro`, page.intro.join('\n\n'), app.intro, problems);

  if (page.sections.length !== app.sections.length) {
    problems.push(`${tag} section count: web ${page.sections.length}, app ${app.sections.length}`);
  }
  const count = Math.max(page.sections.length, app.sections.length);
  for (let n = 0; n < count; n += 1) {
    const web = page.sections[n];
    const src = app.sections[n];
    if (!web || !src) {
      problems.push(`${tag} section ${n + 1} is missing on ${web ? 'the app' : 'the web'}: ${(web || src).heading}`);
      continue;
    }
    compare(`${tag} section ${n + 1} heading`, web.heading, src.heading, problems);
    compare(`${tag} section ${n + 1} ("${src.heading}") text`, web.body.join('\n\n'), src.body, problems);
  }
}

function main() {
  const repo = process.env.SOLIDTRACK_APP_REPO;
  if (!repo) {
    console.log('[solidtrack-legal] SKIPPED: SOLIDTRACK_APP_REPO is not set. Set it to the path of the SolidTrack app repo (workout_tracker) to compare the site text with the app.');
    return;
  }
  const ref = process.env.SOLIDTRACK_APP_REF || 'origin/develop';
  const problems = [];
  let sectionCount = 0;

  for (const key of Object.keys(SCREENS)) {
    const app = parseLegalScreen(gitShow(repo, ref, SCREENS[key]));
    checkPage(key, app, problems);
    sectionCount += app.sections.length;
  }

  const config = gitShow(repo, ref, PRODUCTION_CONFIG);
  const emailMatch = config.match(/supportInfo\s*=\s*\{[^}]*'email':\s*'([^']+)'/);
  if (!emailMatch) problems.push(`support email not found in ${PRODUCTION_CONFIG}`);
  else compare('support email', SOLIDTRACK.email, emailMatch[1], problems);

  if (problems.length > 0) {
    console.error(`[solidtrack-legal] FAILED: ${problems.length} difference(s) between src/data/solidtrackLegal.js and ${ref} of the app:`);
    problems.forEach((p) => console.error(`  - ${p}`));
    process.exitCode = 1;
    return;
  }
  console.log(`[solidtrack-legal] OK: titles, dates, intros, ${sectionCount} section headings and bodies, and the support email match the app (${ref}).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`[solidtrack-legal] ERROR: ${error.message}`);
    process.exitCode = 1;
  }
}
