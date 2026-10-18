import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
await mkdir('dist/theme', { recursive: true });
const files = ['tokens', 'shell', 'components', 'integrations', 'editor', 'fallback', 'navigator', 'selection'];
const css = (await Promise.all(files.map(name => readFile('src/styles/' + name + '.css', 'utf8')))).join('\n');
await writeFile('dist/theme/theme.css', css);
await copyFile('manifest.json', 'dist/theme/manifest.json');
console.log('Built standalone theme only.');
