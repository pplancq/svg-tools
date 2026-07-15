# Release Process

This repository uses [Nx Release](https://nx.dev/features/manage-releases) to manage versioning, changelogs, GitHub releases, and npm publishing from a single command.

## Table of contents

- [Prerequisites](#prerequisites)
- [How versioning works](#how-versioning-works)
- [Triggering a release](#triggering-a-release)
- [Release types](#release-types)
  - [Stable release](#stable-release)
  - [Alpha / Beta / RC](#alpha--beta--rc)
- [Dry run](#dry-run)
- [Changelogs](#changelogs)
- [First release with Nx Release](#first-release-with-nx-release)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- You must be logged in as `pplancq` on GitHub (the workflow is restricted to this user).
- npm publishing relies on the [trusted publisher](https://docs.npmjs.com/adding-packages-to-existing-iam-oidc-provider) / OIDC setup between this GitHub repository and npm. No `NPM_TOKEN` secret is required.
- All commits since the last release must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## How versioning works

This monorepo uses **fixed unified versioning**: every publishable package is released with the same version number (`vX.Y.Z`).

Nx Release determines the next version by analyzing conventional commits since the last git tag matching `vX.Y.Z`.

Because the packages are released together, `@pplancq/svg-react`'s dependency on `@pplancq/svg-core` is automatically updated to the new unified version during the release. You do not need to bump it manually.

| Commit type | Version bump | Included in changelog | Notes |
|-------------|--------------|----------------------|-------|
| `feat`      | minor        | ✨ Features          |       |
| `fix`       | patch        | 🐛 Bug Fixes         |       |
| `perf`      | patch        | ⚡ Performance Improvements |  |
| `revert`    | patch        | ⏪ Reverts            |       |
| `docs`      | none         | 📚 Documentation     |       |
| `refactor`  | none         | ♻️ Code Refactoring  |       |
| `build`     | none         | 🏗️ Build System      |       |
| `ci`        | none         | 👷 CI                |       |
| `chore`     | none         | No                   |       |
| `style`     | none         | No                   |       |
| `test`      | none         | No                   |       |

A `BREAKING CHANGE` footer or `!` in the commit type triggers a major bump.

Commits whose scope is `deps` (for example `fix(deps): bump dompurify`) are grouped under a dedicated **📦 Dependencies** section in the changelog, regardless of their type. They still contribute to the version bump according to their commit type.

## Triggering a release

Releases are triggered manually from the GitHub Actions UI.

1. Go to **Actions → Release**.
2. Click **Run workflow**.
3. Choose the **Release type** (`stable`, `alpha`, `beta`, or `rc`).
4. Optionally enable **Dry run** to preview the release without publishing anything.
5. Optionally enable **Debug mode** for verbose logs.
6. Click **Run workflow**.

The workflow performs the following steps:

1. Installs dependencies.
2. Builds all packages (`npm run build:packages`).
3. Configures npm for provenance and public access.
4. Runs `nx release` (or `nx release prerelease --preid <type>` for pre-releases).
5. Creates a Git commit, a git tag, a GitHub release, and publishes the packages to npm.

## Release types

### Stable release

A stable release is published to the `latest` npm dist-tag and tagged in Git as `vX.Y.Z`.

Select **Release type: `stable`** in the workflow.

### Alpha / Beta / RC

Pre-releases are published to their own npm dist-tag (`alpha`, `beta`, or `rc`) and tagged in Git as `vX.Y.Z-alpha.N`, `vX.Y.Z-beta.N`, or `vX.Y.Z-rc.N`.

Select the corresponding **Release type** in the workflow.

Example: if the current stable version is `3.0.11` and a `fix` commit is merged, choosing **Beta** will produce `3.0.12-beta.0` and publish it with the `beta` dist-tag.

## Dry run

Always run a dry-run first when changing the release configuration or before a major release.

1. In the workflow UI, enable **Dry run**.
2. Run the workflow.
3. Review the logs:
   - The next calculated version.
   - The generated changelog entry.
   - The packages that would be published.
   - The git tag and GitHub release that would be created.

No commit, tag, release, or publish is performed during a dry run.

## Changelogs

- The workspace-level changelog is generated at [`CHANGELOG.md`](./CHANGELOG.md).
- Section titles include emojis for readability (for example: ✨ Features, 🐛 Bug Fixes, 📦 Dependencies).
- Dependency updates committed with the `deps` scope are grouped under **📦 Dependencies**.
- Per-package changelogs before the unified versioning system are kept as archives:
  - [`packages/svg-core/CHANGELOG.md`](./packages/svg-core/CHANGELOG.md)
  - [`packages/svg-react/CHANGELOG.md`](./packages/svg-react/CHANGELOG.md)
- The Storybook documentation includes:
  - a global **Changelog** page reading `CHANGELOG.md`;
  - archived per-package changelog pages.

## First release with Nx Release

The repository already contains a `v3.0.11` git tag created from the last `multi-semantic-release` release. This tag allows Nx Release to continue versioning from `3.0.11` without starting over.

If you ever need to bootstrap a fresh repository, run:

```bash
npx nx release --first-release --dry-run
```

## Troubleshooting

### No changes detected

If the dry-run prints `No changes were detected`, check that:

- commits have been pushed to `main`;
- the commits follow Conventional Commits;
- the last release tag (`vX.Y.Z`) exists in the repository.

### Wrong version calculated

Verify that the latest `vX.Y.Z` tag points to the expected commit:

```bash
git tag --list 'v*' --sort=-v:refname
```

### npm publish fails

- Ensure the trusted publisher / OIDC relationship is correctly configured on npm for this GitHub repository.
- Ensure the workflow has `id-token: write` permission (already configured).
- Check that npm provenance is enabled only on supported runners (GitHub Actions `ubuntu-latest` is supported).

### GitHub release not created

- Ensure the workflow has `contents: write` permission.
- Ensure `GITHUB_TOKEN` is available in the release step environment.
