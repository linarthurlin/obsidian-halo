# Personal Glass Theme

[![CI](https://github.com/linarthurlin/obsidian-personal-glass/actions/workflows/ci.yml/badge.svg)](https://github.com/linarthurlin/obsidian-personal-glass/actions/workflows/ci.yml)

Standalone original MIT Obsidian theme. This chat/repository now owns visual design only. Paired palettes, flat rounded selection, editor components, accessibility fallbacks and scoped plugin adapters work without a companion.

## Separate components

- [Theme](https://github.com/linarthurlin/obsidian-personal-glass) — visual CSS, tokens and adapters.
- [Companion](https://github.com/linarthurlin/obsidian-personal-glass-companion) — UI behavior and appearance controls.
- [Knowledge Agent](https://github.com/linarthurlin/obsidian-knowledge-agent) — knowledge review and future model orchestration.

Each has its own manifest, build, version, installer, CI and releases. No runtime imports or build dependencies on the other repositories. See [integration contract](docs/INTEGRATION-CONTRACT.md), [split/migration](docs/REPOSITORY-SPLIT.md) and [handoff](docs/HANDOFF.zh-TW.md).

## Install

Download `personal-glass-theme-<version>.zip` from [Releases](https://github.com/linarthurlin/obsidian-personal-glass/releases). Extract into `<vault>/.obsidian/themes/Personal Glass/`. Select Personal Glass in Appearance. The installer does not activate anything or modify notes/configuration/data.json.

Companion users previously following this repo with BRAT must switch their plugin source to `linarthurlin/obsidian-personal-glass-companion`, retaining folder/id `personal-glass`. This repo no longer publishes plugin JavaScript. The original combined releases remain available.

The theme can style supported plugins through documented tokens and scoped adapters, including the Agent `.pga-workbench` interface. It cannot guarantee access to every plugin’s Canvas or iframe rendering. [Plugin adapter policy](docs/PLUGIN-ADAPTERS.md).

[Flat selection preview](docs/screenshots/flat-selection.jpg) · [Offline SVG skill](skills/personal-glass-svg/SKILL.md).

[Subtle surfaces and optional appearance settings](docs/SURFACES.zh-TW.md): original low-opacity backgrounds, opaque flat selection and focus mode. After `npm run preview`, visit `/surfaces` for interactive synthetic light/dark and opacity controls.

## Develop

Node.js 22.12+ and npm. Run independently in this repo:

```sh
npm ci
npm run check
npm run package
```

Installable output: `dist/theme`. Release output: `release/current`. CI validates on Linux and Windows; matching `x.y.z` tags publish prereleases with SHA-256 checksums. `npm run preview` opens a local synthetic visual fixture; it is not an Obsidian runtime test.

The split does not deploy anything into a personal vault. Runtime verification of the independent components remains pending; historical combined-app evidence is clearly separated in [testing](docs/TESTING.md).
