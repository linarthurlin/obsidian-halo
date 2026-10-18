Personal Glass Theme 0.4.1 — adapters and accessibility prerelease.

Split five original visual adapters into independent CSS modules. Add shared hover/focus tokens and optional themed selection colors, foreground and corner-radius settings while retaining opaque flat selection.

Review the Notebook Navigator 3.4.3 source contract at commit 667ece262dda7645c78a76812b12a70d788aae24: use solid color tokens, preserve selected metadata contrast and connected multi-selection corners, and retain custom filename colors. No upstream implementation is bundled.

Fix print shadow cascade, code/table wrapping and reduced-motion/transparency overlay overrides. Add synthetic navigation-state and media-branch previews with browser inspection evidence. Eleven tests pass; package boundaries and checksums are verified.

Synthetic branch activation is not OS emulation, print-engine testing or real plugin certification. Fresh Obsidian integration, real system preferences, print pagination, Windows materials/DPI/multi-monitor and performance remain pending. No vault deployment or note changes.
