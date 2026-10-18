# Personal Glass Theme testing

Run npm ci, npm run check and npm run package independently in this repository. CI repeats checks on Linux and Windows. Installer tests use temporary synthetic vaults and reject linked directories. Only two theme files may be installed; notes, existing data.json and activation lists are preserved.

CSS/manifest validation and SVG tests remain here. The theme must package no plugin manifest, plugin JavaScript or knowledge engine.

Fresh Obsidian runtime testing of the three split components, plugin-alone/default-theme fallback, unload/popouts and joint visual integration remains pending. Do not infer it from historical monolith screenshots. See HISTORICAL-MONOLITH-TESTING.md.

Theme split validation: six tests pass locally (installation preservation/junction rejection, manifest/runtime boundaries, public CSS contract and offline SVG generation). Packaging additionally checks every ZIP entry, the exact release asset set and all four SHA-256 checksums. A clean npm ci completes with zero reported dependency vulnerabilities. These checks do not claim live Obsidian visual verification.

Version 0.4.1 expands this to eleven tests, including dark selection contrast, opaque focus precedence, print shadow/overflow regression, accessibility override priority and Notebook Navigator color-token contracts. `/states` and `/media-preview.css?mode=print|contrast|transparency|motion` provide synthetic browser branch inspection, not OS emulation. See [state verification](STATES.zh-TW.md). Real app/print-engine verification remains pending.
