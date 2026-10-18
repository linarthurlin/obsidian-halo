import { it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

const built = async () => postcss.parse(await readFile('dist/theme/theme.css','utf8'));

it('print removes shadows even from opt-in cards and wraps long code/tables', async () => {
  const root = await built();
  const print = root.nodes.find(n => n.type === 'atrule' && n.name === 'media' && n.params === 'print') as postcss.AtRule;
  let shadow: postcss.Declaration | undefined;
  print.walkDecls('box-shadow', d => { shadow=d; });
  expect(shadow?.value).toBe('none');
  expect(shadow?.important).toBe(true);
  expect(print.toString()).toContain('white-space: pre-wrap');
  expect(print.toString()).toContain('table-layout: fixed');
  let text: postcss.Declaration | undefined;
  print.walkDecls('--personal-text', d => { text=d; });
  expect(text?.important).toBe(true);
});

it('accessibility overrides normal inline preferences and covers every overlay', async () => {
  const root = await built();
  const media = root.nodes.filter(n => n.type === 'atrule' && n.name === 'media') as postcss.AtRule[];
  const reduced = media.filter(n => n.params.includes('prefers-reduced-transparency'));
  let blur: postcss.Declaration | undefined;
  reduced.forEach(n => n.walkDecls('--personal-overlay-blur', d => { blur=d; }));
  expect(blur?.value).toBe('0px');
  expect(blur?.important).toBe(true);
  for (const overlay of ['.modal','.popover','.menu','.suggestion-container']) expect(reduced.map(n=>n.toString()).join()).toContain(overlay);
  const motion = media.find(n => n.params.includes('prefers-reduced-motion'))!;
  let duration: postcss.Declaration | undefined;
  motion.walkDecls('--personal-duration', d=>{duration=d;});
  expect(duration?.important).toBe(true);
});

it('Notebook Navigator color tokens remain colors while the selected surface uses the gradient', async () => {
  const root = await built();
  const values = new Map<string,string>();
  root.walkDecls(/^--nn-theme-file-selected/, d=>{values.set(d.prop,d.value);});
  expect(values.get('--nn-theme-file-selected-bg')).toBe('var(--pg-selection-start)');
  expect(values.get('--nn-theme-file-selected-inactive-bg')).toBe('var(--pg-selection-start)');
  for (const kind of ['name','preview','date','word-count','parent']) expect(values.get('--nn-theme-file-selected-'+kind+'-color')).toBe('var(--pg-selection-text)');
  const selection = await readFile('src/styles/selection.css','utf8');
  expect(selection).toContain(".nn-file-name:not([data-has-color='true'])");
  expect(selection).toContain('nn-has-selected-above');
  expect(selection).toContain('nn-has-selected-below');
});
