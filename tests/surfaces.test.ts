import { it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

it('keeps dark reduced-transparency selection legible without companion inputs', async () => {
  const css = postcss.parse(await readFile('src/styles/selection.css', 'utf8'));
  let fallback = '';
  css.walkAtRules('media', media => {
    if (!media.params.includes('prefers-reduced-transparency')) return;
    media.walkRules('body.theme-dark', rule => rule.walkDecls('--pg-selection-text', d => { fallback = d.value; }));
  });
  expect(fallback).toBe('var(--pg-selection-dark-opaque-text, #f1f4ef)');
  // WCAG contrast of shipped opaque text against both dark gradient endpoints.
  const luminance = (hex: string) => {
    const rgb = hex.match(/\w\w/g)!.map(c => parseInt(c,16)/255).map(c => c <= .04045 ? c/12.92 : ((c+.055)/1.055)**2.4);
    return rgb[0]*.2126 + rgb[1]*.7152 + rgb[2]*.0722;
  };
  for (const color of ['514a39','354c41']) expect((luminance('f1f4ef')+.05)/(luminance(color)+.05)).toBeGreaterThan(4.5);
});

it('focus mode overrides slider and companion transparency without blurring text', async () => {
  const root = postcss.parse(await readFile('src/styles/shell.css','utf8'));
  const focus = root.nodes.find(node => node.type === 'rule' && node.selector.includes('body.pg-surfaces-focus'));
  expect(focus?.toString()).toContain('--personal-panel-alpha: 100% !important');
  expect(focus?.toString()).toContain('--personal-overlay-blur: 0px !important');
  root.walkDecls(/^(opacity|filter)$/, declaration => { throw new Error('Unexpected whole-element effect: '+declaration.toString()); });
});
