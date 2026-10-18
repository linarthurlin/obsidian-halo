import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';
const port = Number(process.env.PORT || 4178);
const routes = { '/': ['preview/index.html', 'text/html; charset=utf-8'], '/theme.css': ['dist/theme/theme.css', 'text/css'], '/orbit.svg': ['demo-vault/assets/orbit.svg', 'image/svg+xml'] };
routes['/selection'] = ['preview/selection.html', 'text/html; charset=utf-8'];
routes['/selection-frame'] = ['preview/selection-frame.html', 'text/html; charset=utf-8'];
routes['/surfaces'] = ['preview/surfaces.html', 'text/html; charset=utf-8'];
routes['/states'] = ['preview/states.html', 'text/html; charset=utf-8'];
routes['/implementation'] = ['preview/implementation.html', 'text/html; charset=utf-8'];
routes['/objects'] = ['preview/objects.html', 'text/html; charset=utf-8'];
routes['/objects.css'] = ['preview/objects.css', 'text/css'];
routes['/objects.js'] = ['preview/objects.js', 'text/javascript; charset=utf-8'];
routes['/review-file-type-pdf.svg'] = ['preview/assets/file-type-pdf.svg', 'image/svg+xml'];
routes['/review-check-light.svg'] = ['preview/assets/check-light.svg', 'image/svg+xml'];
routes['/review-check-dark.svg'] = ['preview/assets/check-dark.svg', 'image/svg+xml'];
routes['/engineering-light.svg'] = ['demo-vault/assets/engineering-light.svg', 'image/svg+xml'];
routes['/engineering-dark.svg'] = ['demo-vault/assets/engineering-dark.svg', 'image/svg+xml'];
createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  if (url.pathname === '/media-preview.css') {
    // Synthetic fixture only: activate one actual media branch without claiming OS emulation.
    const modes = { print: 'print', contrast: '(forced-colors: active)', transparency: '(prefers-reduced-transparency: reduce)', motion: '(prefers-reduced-motion: reduce)' };
    const selected = modes[url.searchParams.get('mode')];
    if (!selected) { res.writeHead(400); res.end('Unknown preview mode'); return; }
    try {
      const css = postcss.parse(await readFile('dist/theme/theme.css', 'utf8'));
      css.walkAtRules('media', rule => { if (rule.params === selected) rule.params = 'all'; });
      res.writeHead(200, { 'Content-Type': 'text/css' }); res.end(css.toString());
    } catch { res.writeHead(500); res.end('Build theme first'); }
    return;
  }
  const route = routes[url.pathname];
  if (!route) { res.writeHead(404); res.end('Not found'); return; }
  try { res.writeHead(200, { 'Content-Type': route[1] }); res.end(await readFile(route[0])); }
  catch { res.writeHead(500); res.end('Run npm run build first.'); }
}).listen(port, '127.0.0.1', () => console.log(`Synthetic preview: http://127.0.0.1:${port}`));
