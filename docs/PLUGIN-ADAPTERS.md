# Plugin visual adapters

Theme-owned source: src/styles/integrations.css, navigator.css and selection.css. Prefer stable documented CSS variables, then scoped selectors for a tested plugin version. Never import plugin code, manipulate its DOM, change its settings or add AI behavior from CSS tooling.

Current targets: Personal Glass Companion Navigator, native Explorer selection, optional Notebook Navigator tokens/selection, Crisp Craft shared Reading View tokens, Canvas nodes, Live Preview tables and the new Agent .pga-workbench token interface. Third-party runtime compatibility and the new independent Agent view need fresh app testing.

A new adapter must document target version, DOM/token contract and fallback, then verify light/dark, keyboard focus, high contrast, narrow views and disabled/uninstalled plugin. Generic rules must not leak into unrelated plugins. Canvas, Shadow DOM and iframe internals may not be themeable; do not promise universal compatibility.

## Compatibility evidence matrix · 0.4.0

| Target | Contract | Version / evidence | Pending |
| --- | --- | --- | --- |
| Native Explorer | `.nav-file-title.is-active` | Synthetic shipped CSS; light/dark + 720px inspected | Obsidian versioned hover/focus/unfocused matrix |
| Companion Navigator | `.pg-file`, `aria-current=page` | Contract v1; existing synthetic selection fixture | Independent plugin release + real app matrix |
| Notebook Navigator | `--nn-theme-*`, `.nn-file.nn-selected` | Selector/token adapter only; no current runtime version certified | Pin tested version and validate all states |
| Knowledge Agent | `.pga-workbench`, `--pg-*` | Contract v1 only | Independent release and coexistence validation |
| Crisp Craft | Shared reading tokens | No current runtime version certified | Pin version and verify generated content |
| Canvas / Live Preview | Native node/table selectors | Historical monolith evidence only | Fresh split-theme reading/editing tests |

Unknown versions are intentionally not listed as supported releases. Disabling a plugin leaves its scoped rules inert. Synthetic fixtures do not certify another plugin's DOM.
