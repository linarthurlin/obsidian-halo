# Plugin visual adapters

Theme-owned source: `src/styles/adapters/{native,notebook-navigator,companion,knowledge-agent,crisp-craft}.css`, `navigator.css` and `selection.css`. Build concatenates each adapter explicitly; no imports or third-party CSS are shipped. Prefer stable documented CSS variables, then scoped selectors for a tested plugin version. Never import plugin code, manipulate its DOM, change its settings or add AI behavior from CSS tooling.

Current targets: Personal Glass Companion Navigator, native Explorer selection, optional Notebook Navigator tokens/selection, Crisp Craft shared Reading View tokens, Canvas nodes, Live Preview tables and the new Agent .pga-workbench token interface. Third-party runtime compatibility and the new independent Agent view need fresh app testing.

Theme 0.5.0 adds native Bases variables and `adapters/content-plugins.css`. Dataview tables inherit document rules; Tasks inherits native task tokens without claiming custom status support. Kanban 2.0.51 board/lane/item selectors were source-reviewed at `5134c05ad9a7861f551cd15d57cf50db8394901a`, not runtime certified. Optional `.pg-plugin-card` / `.pg-plugin-lane` classes are additive visual opt-ins. See [component coverage](COMPONENTS.zh-TW.md).

A new adapter must document target version, DOM/token contract and fallback, then verify light/dark, keyboard focus, high contrast, narrow views and disabled/uninstalled plugin. Generic rules must not leak into unrelated plugins. Canvas, Shadow DOM and iframe internals may not be themeable; do not promise universal compatibility.

## Compatibility evidence matrix · 0.4.0

| Target | Contract | Version / evidence | Pending |
| --- | --- | --- | --- |
| Native Explorer | `.nav-file-title.is-active` | Synthetic shipped CSS; light/dark + 720px inspected | Obsidian versioned hover/focus/unfocused matrix |
| Companion Navigator | `.pg-file`, `aria-current=page` | Contract v1; existing synthetic selection fixture | Independent plugin release + real app matrix |
| Notebook Navigator | `--nn-theme-*`, `.nn-file.nn-selected` | 3.4.3 source contract reviewed at `667ece262dda7645c78a76812b12a70d788aae24`; original synthetic fixture inspected | Real plugin runtime states and load order |
| Knowledge Agent | `.pga-workbench`, `--pg-*` | Contract v1 only | Independent release and coexistence validation |
| Crisp Craft | Shared reading tokens | No current runtime version certified | Pin version and verify generated content |
| Canvas / Live Preview | Native node/table selectors | Historical monolith evidence only | Fresh split-theme reading/editing tests |

Unknown versions are intentionally not listed as supported releases. Disabling a plugin leaves its scoped rules inert. Synthetic fixtures do not certify another plugin's DOM.

## Notebook Navigator source review · 0.4.1

Reviewed upstream [theming guide](https://github.com/johansan/notebook-navigator/blob/667ece262dda7645c78a76812b12a70d788aae24/docs/theming-guide.md), [styles](https://github.com/johansan/notebook-navigator/blob/667ece262dda7645c78a76812b12a70d788aae24/styles.css) and manifest. `--nn-theme-file-selected-bg` is used as a color (including upstream compositing), so it receives a solid gradient endpoint; our existing pseudo-element adapter renders the gradient. Inactive text colors inherit their selected counterparts upstream. Selected metadata now uses the same foreground as its title; custom file-name colors remain owned by the plugin. Connected multi-selection corners are preserved. Theme mode selectors outrank upstream's generic body token defaults.

No upstream implementation is bundled. Source review is evidence of the CSS contract, not a runtime certification of 3.4.3. See [state verification](STATES.zh-TW.md).
