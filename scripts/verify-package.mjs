import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { unzipSync } from 'fflate';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const expected = ['theme.css', 'manifest.json', 'personal-glass-theme-' + pkg.version + '.zip', 'personal-glass-svg-tools-' + pkg.version + '.zip', 'SHA256SUMS.txt'];
assert.deepEqual((await readdir('release/current')).sort(), expected.sort());
const theme = unzipSync(await readFile('release/current/personal-glass-theme-' + pkg.version + '.zip'));
assert.deepEqual(Object.keys(theme).sort(), ['LICENSE', 'manifest.json', 'theme.css']);
assert(!JSON.parse(new TextDecoder().decode(theme['manifest.json'])).id);
const tools = unzipSync(await readFile('release/current/personal-glass-svg-tools-' + pkg.version + '.zip'));
assert(Object.keys(tools).every(path => path === 'LICENSE' || path.startsWith('skills/personal-glass-svg/')));
const sums = (await readFile('release/current/SHA256SUMS.txt', 'utf8')).trim().split('\n');
assert.equal(sums.length, 4);
for (const line of sums) {
  const [hash, name] = line.split('  ');
  assert(expected.includes(name));
  assert.equal(createHash('sha256').update(await readFile('release/current/' + name)).digest('hex'), hash);
}
console.log('Verified theme-only ZIP contents and every release checksum.');
