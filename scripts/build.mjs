import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
await mkdir('dist/theme', { recursive: true });
const files = ['tokens', 'icon-assets', 'shell', 'components', 'document-objects', 'workspace-objects', 'adapters/bases', 'adapters/content-plugins', 'adapters/native', 'adapters/notebook-navigator',
  'adapters/companion', 'adapters/knowledge-agent', 'adapters/crisp-craft', 'editor', 'navigator', 'selection', 'fallback'];
const css = (await Promise.all(files.map(name => readFile('src/styles/' + name + '.css', 'utf8')))).join('\n');
await writeFile('dist/theme/theme.css', css);
await copyFile('manifest.json', 'dist/theme/manifest.json');
console.log('Built standalone theme only.');
