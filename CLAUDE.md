# Email Editor (Mendix pluggable widget)

Mendix pluggable widget `stoneworx.ReactEmailEditor` that embeds Unlayer's email editor through
[react-email-editor](https://github.com/unlayer/react-email-editor). Released on the Mendix Marketplace.

The repository is public: treat every file, commit and commit author as published. No secrets, credentials, customer or
employer data, internal hostnames, or names/logins of reviewers and colleagues in any file.

## Before you start

-   Check the open pull requests first (`gh pr list`). They are often stacked (each branch builds on the previous one);
    put work on the newest relevant branch instead of opening a parallel PR, and never redo what an open PR already
    does.

## Build

-   Node 22 (`engines`), `npm ci`.
-   `npm run lint`, `npm test`, `npm run build` (development package, no license notice).
-   `npm run release`: lint, minified build, `dist/<version>/stoneworx.ReactEmailEditor.mpk`, then
    `scripts/check-mpk.mjs` (postrelease) fails if the .mpk lacks LICENSE or a license text in `dependencies.txt`.
    Releases are built on Windows, so this check runs locally as well as in CI.
-   `rollup.config.mjs` adds two build guards that fail with `this.error`: one copies LICENSE into the package (the
    toolchain's own copy silently does nothing on Windows), one rejects unconverted `require()` of externals in the ESM
    bundle.
-   `dist/<version>/*.mpk` is committed for each release; `dist/tmp/` is build output and ignored.

## Dependency quirks

-   `@mendix/pluggable-widgets-tools` and `mendix` stay on the minor of the target Studio Pro (11.12.x now); React is
    pinned through `resolutions`/`overrides`, never in `dependencies`. See `comment_mendix11` in package.json.
-   `@swc/core` is pinned for `npm test` on Windows.
-   Dependabot ignores minor/major bumps of the toolchain and `mendix`; update those with the target Mendix version.

## Compliance

-   License: MIT (LICENSE and `license` in package.json must stay in sync).
-   Production dependencies must use MIT, MIT-0, ISC, BSD-2/3-Clause, 0BSD, Apache-2.0, Python-2.0, CC0-1.0 or
    BlueOak-1.0.0. Check with
    `npx license-checker-rseidelsohn@5.0.1 --production --excludePrivatePackages --excludePackagesStartingWith "@mendix/;reactemaileditor@" --onlyAllow "MIT;MIT-0;ISC;BSD-2-Clause;BSD-3-Clause;0BSD;Apache-2.0;Python-2.0;CC0-1.0;BlueOak-1.0.0"`
    (always an exact version). Anything else needs the maintainer's decision.
-   Unlayer is a hosted, proprietary service loaded at runtime; its terms and paid features are noted in the README.
-   The `Compliance` workflow runs gitleaks (pinned version and SHA-256) on the full history and the license check.
-   `demo/*.mpk` holds a Mendix demo project: keep test data only (no real addresses, constants or credentials).
