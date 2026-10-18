# Personal Glass Theme scope

This repository owns only theme CSS, visual adapters, visual fixtures and the offline SVG authoring skill.
Do not implement plugin behavior, AI orchestration, note ingestion or vault writes here. See docs/INTEGRATION-CONTRACT.md and docs/HANDOFF.zh-TW.md.

Never use personal vault notes as fixtures or commit credentials, local config, private plans, receipts or third-party binaries. Do not deploy or activate plugins unless the user asks. Existing vault notes must remain untouched. Run npm run check and npm run package before publishing. Do not claim runtime/visual verification from unit tests alone. Preserve the repository split and independent releases.
