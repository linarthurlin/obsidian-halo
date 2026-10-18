import { zipSync, strToU8 } from 'fflate';
import { readFile, writeFile, mkdir, readdir, lstat, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const component = JSON.parse(await readFile('component.json', 'utf8'));
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(component.kind, 'theme');
assert.equal(component.artifact, 'personal-glass-theme');
await mkdir('release/current', { recursive: true });
// The output directory is owned by this packager; never remove unknown files or linked paths.
for (const name of await readdir('release/current')) {
  assert(/^(?:theme\.css|manifest\.json|SHA256SUMS\.txt|personal-glass-(?:theme|svg-tools)-\d+\.\d+\.\d+\.zip)$/.test(name), 'Unknown release file: ' + name);
  const path = 'release/current/' + name;
  assert((await lstat(path)).isFile(), 'Unsafe release path');
  await unlink(path);
}
const sums = [];
async function output(name, bytes) {
  await writeFile('release/current/' + name, bytes);
  sums.push(createHash('sha256').update(bytes).digest('hex') + '  ' + name);
}
const files = {};
for (const name of ['theme.css', 'manifest.json']) {
  const bytes = new Uint8Array(await readFile('dist/theme/' + name));
  files[name] = bytes;
  await output(name, bytes);
}
files.LICENSE = strToU8(await readFile('LICENSE', 'utf8'));
await output('personal-glass-theme-' + pkg.version + '.zip', zipSync(files));
const tools = {};
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = dir + '/' + entry.name;
    if (entry.isDirectory()) await collect(path);
    else if (entry.isFile()) tools[path] = new Uint8Array(await readFile(path));
  }
}
await collect('skills/personal-glass-svg');
tools.LICENSE = files.LICENSE;
await output('personal-glass-svg-tools-' + pkg.version + '.zip', zipSync(tools));
await writeFile('release/current/SHA256SUMS.txt', sums.join('\n') + '\n');
console.log('Packaged standalone theme and optional offline SVG tools only.');
