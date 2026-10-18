import { it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';

it('scopes custom checkbox pixels to metadata and binary tasks, preserving plugin statuses', async () => {
  const css=postcss.parse(await readFile('src/styles/document-objects.css','utf8'));
  let checkboxSelector='';
  css.walkRules(rule=>{if(rule.nodes.some(d=>d.type==='decl'&&d.prop==='appearance'&&d.value==='none'))checkboxSelector=rule.selector;});
  const dom=new JSDOM(`<div class="metadata-property-value"><input id="meta" type="checkbox"></div>
    <li class="task-list-item" data-task="x"><input id="done" class="task-list-item-checkbox" type="checkbox"></li>
    <li class="task-list-item" data-task=" "><input id="todo" class="task-list-item-checkbox" type="checkbox"></li>
    <li class="task-list-item" data-task="?"><input id="custom" class="task-list-item-checkbox" type="checkbox"></li>
    <div class="checkbox-container"><input id="switch" type="checkbox"></div>`);
  const matched=[...dom.window.document.querySelectorAll(checkboxSelector)].map(e=>e.id);
  expect(matched.sort()).toEqual(['done','meta','todo']);
  dom.window.close();
});

it('ships offline vector icons with their license inside the two-file theme', async () => {
  const css=await readFile('dist/theme/theme.css','utf8');
  expect(css).toContain('Copyright (c) 2020-2026 Paweł Kuna');
  const data=[...css.matchAll(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g)].map(m=>Buffer.from(m[1],'base64').toString());
  expect(data).toHaveLength(3);
  for(const svg of data){expect(svg).toContain('<svg');expect(svg).not.toContain('<script');}
  expect(data.some(svg=>svg.includes('#fffefa'))).toBe(true);
  expect(data.some(svg=>svg.includes('#201f1c'))).toBe(true);
  expect(css).not.toMatch(/url\(['"]?\/(?:review|objects)/);
});

it('keeps optional density changes compatible with reading and editor table widgets', async () => {
  const css=await readFile('dist/theme/theme.css','utf8');
  expect(css).toContain('body.pg-compact-tables');
  expect(css).toContain('body.pg-striped-tables');
  expect(css).toContain('.markdown-source-view.mod-cm6 .cm-table-widget :is(th, td) { padding: var(--personal-table-cell-padding); }');
  const preview=await readFile('preview/implementation.html','utf8');
  expect(preview).not.toContain('/objects.css');
  expect(preview).toContain('/theme.css');
});
