# Plugin visual adapters

Theme-owned source: src/styles/integrations.css, navigator.css and selection.css. Prefer stable documented CSS variables, then scoped selectors for a tested plugin version. Never import plugin code, manipulate its DOM, change its settings or add AI behavior from CSS tooling.

Current targets: Personal Glass Companion Navigator, native Explorer selection, optional Notebook Navigator tokens/selection, Crisp Craft shared Reading View tokens, Canvas nodes, Live Preview tables and the new Agent .pga-workbench token interface. Third-party runtime compatibility and the new independent Agent view need fresh app testing.

A new adapter must document target version, DOM/token contract and fallback, then verify light/dark, keyboard focus, high contrast, narrow views and disabled/uninstalled plugin. Generic rules must not leak into unrelated plugins. Canvas, Shadow DOM and iframe internals may not be themeable; do not promise universal compatibility.
