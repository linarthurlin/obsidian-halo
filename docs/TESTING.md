# Personal Glass Theme testing

## 2026-10-18: initial personal-vault deployment smoke check

Theme 0.5.0 was backed up and installed into an already-selected Personal Glass vault. Deployment verification matched both installed files to the build and found only theme.css and manifest.json changed at install time. All existing Markdown content hashes matched after the check. Private paths, hashes and backup details stay in ignored `.local/`; no personal notes or screenshots are committed as fixtures.

Windows Obsidian 1.14.4: inspected the current dark-mode workspace after automatic stylesheet reload, then Reading View and Live Preview, including visible Properties, tag values, a document table, Callout and Outline. Restored Live Preview. No appearance settings, plugin activation or note edits were performed. This is a limited smoke check of visible components, not full interaction-state certification.

Companion, Knowledge Agent and Style Settings were not enabled in that workspace; their integration and appearance-control UI remain pending. Dataview and Kanban were enabled but their complete views were not exercised. Light-mode runtime, checkboxes/PDF/Bases runtime, popouts, OS accessibility, printing, DPI/multiple monitors and performance remain unverified.

Run npm ci, npm run check and npm run package independently in this repository. CI repeats checks on Linux and Windows. Installer tests use temporary synthetic vaults and reject linked directories. Only two theme files may be installed; notes, existing data.json and activation lists are preserved.

CSS/manifest validation and SVG tests remain here. The theme must package no plugin manifest, plugin JavaScript or knowledge engine.

Fresh Obsidian runtime testing of the three split components, plugin-alone/default-theme fallback, unload/popouts and joint visual integration remains pending. Do not infer it from historical monolith screenshots. See HISTORICAL-MONOLITH-TESTING.md.

Version 0.5.0: fourteen tests. Added selector-scope checks proving binary checkbox styling does not select custom task statuses or switch containers, embedded vector/license checks, and Reading/table-widget density coverage. `/implementation` loads the built theme without review CSS. The six groups of light/dark production fixtures, keyboard checkbox changes, compact-table computed padding and three Callout contrast samples were inspected in the browser. See [component evidence](COMPONENTS.zh-TW.md). Unit checks do not certify runtime DOM compatibility.

Theme split validation: six tests pass locally (installation preservation/junction rejection, manifest/runtime boundaries, public CSS contract and offline SVG generation). Packaging additionally checks every ZIP entry, the exact release asset set and all four SHA-256 checksums. A clean npm ci completes with zero reported dependency vulnerabilities. These checks do not claim live Obsidian visual verification.

Version 0.4.1 expands this to eleven tests, including dark selection contrast, opaque focus precedence, print shadow/overflow regression, accessibility override priority and Notebook Navigator color-token contracts. `/states` and `/media-preview.css?mode=print|contrast|transparency|motion` provide synthetic browser branch inspection, not OS emulation. See [state verification](STATES.zh-TW.md). Real app/print-engine verification remains pending.
