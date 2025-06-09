## @pplancq/svg-core [2.0.0](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.2.1...@pplancq/svg-core@2.0.0) (2025-06-09)

### ⚠ BREAKING CHANGES

* **svg-core:** the getSvg function now throws custom exceptions (InvalidSvgError, ContentSvgError) in case of errors when retrieving or validating an SVG.

### Features

* **svg-core:** implement mergeSvgContent function and update exports ([5f997f3](https://github.com/pplancq/svg-tools/commit/5f997f3785bf30ab2406ba63e26d915f0cbbd1af))
* **svg-core:** introduce custom error classes for SVG validation ([ad16579](https://github.com/pplancq/svg-tools/commit/ad16579025e923d17d2e8d6b85ada35f27ddc8f2))

## @pplancq/svg-core 2.0.0-alpha.1 (2025-06-04)

* feat(svg-core): implement mergeSvgContent function and update exports ([36d6711](https://github.com/pplancq/svg-tools/commit/36d6711))
* feat(svg-core)!: introduce custom error classes for SVG validation ([08cf325](https://github.com/pplancq/svg-tools/commit/08cf325))
* chore(svg-tools): update coverage configuration to check for true string in CI environment ([e5ad7e2](https://github.com/pplancq/svg-tools/commit/e5ad7e2))
* chore(deps): update dependency @pplancq/eslint-config to ^4.0.24 ([4d6bc3a](https://github.com/pplancq/svg-tools/commit/4d6bc3a))
* chore(deps): update dependency @rslib/core to ^0.9.1 ([0fea1be](https://github.com/pplancq/svg-tools/commit/0fea1be))
* chore(deps): update dependency eslint-plugin-prettier to ^5.4.1 ([a97bd30](https://github.com/pplancq/svg-tools/commit/a97bd30))


### BREAKING CHANGE

* the getSvg function now throws custom exceptions (InvalidSvgError, ContentSvgError) in case of errors when retrieving or validating an SVG.

## <small>1.2.1 (2025-05-26)</small>

* test(svg-core): correct circle attribute order in SVG output assertions ([13239af](https://github.com/pplancq/svg-tools/commit/13239af))
* fix(deps): update dependency dompurify to ^3.2.6 ([094ece2](https://github.com/pplancq/svg-tools/commit/094ece2))
* chore(svg-tools): fix coverage reporting in CI environment ([a071a39](https://github.com/pplancq/svg-tools/commit/a071a39))
* chore(storybook): initialize Storybook configuration and add Welcome page ([fa9d1ee](https://github.com/pplancq/svg-tools/commit/fa9d1ee))
* chore(deps): update dependency @pplancq/eslint-config to ^4.0.22 ([b10c885](https://github.com/pplancq/svg-tools/commit/b10c885))
* chore(deps): update dependency @pplancq/eslint-config to ^4.0.23 ([3f4c312](https://github.com/pplancq/svg-tools/commit/3f4c312))
* chore(deps): update dependency @pplancq/prettier-config to ^1.2.5 ([2d381a7](https://github.com/pplancq/svg-tools/commit/2d381a7))
* chore(deps): update dependency @pplancq/prettier-config to ^1.2.6 ([bbcfaa0](https://github.com/pplancq/svg-tools/commit/bbcfaa0))
* chore(deps): update dependency @rslib/core to ^0.7.1 ([762e3b0](https://github.com/pplancq/svg-tools/commit/762e3b0))
* chore(deps): update dependency @rslib/core to ^0.8.0 ([35683a5](https://github.com/pplancq/svg-tools/commit/35683a5))
* chore(deps): update dependency eslint to ^9.27.0 ([7c9a1cf](https://github.com/pplancq/svg-tools/commit/7c9a1cf))
* chore(deps): update vitest monorepo to ^3.1.4 ([47c1f93](https://github.com/pplancq/svg-tools/commit/47c1f93))

## @pplancq/svg-core [1.2.0](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.1.3...@pplancq/svg-core@1.2.0) (2025-05-13)

### Features

* **svg-core:** update main and types fields to point to getSvg.js ([b96e46a](https://github.com/pplancq/svg-tools/commit/b96e46a890bd89c94634d5085a60a7086e4b6e99))

## @pplancq/svg-core [1.1.3](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.1.2...@pplancq/svg-core@1.1.3) (2025-05-06)

### Bug Fixes

* **svg-react:** fixed handling of inline SVGs encoded with encodeURI ([81b7b85](https://github.com/pplancq/svg-tools/commit/81b7b855d20b52928b9af04f102432039730b89d))

## @pplancq/svg-core [1.1.2](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.1.1...@pplancq/svg-core@1.1.2) (2025-04-07)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.5 ([bb4d1bf](https://github.com/pplancq/svg-tools/commit/bb4d1bf4df548af48859c38d1c4f2e7963d48f53))

## @pplancq/svg-core [1.1.1](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.1.0...@pplancq/svg-core@1.1.1) (2025-03-18)

### Bug Fixes

* **svg-core:** fix inline SVG data base64 encoded in getSvg function ([091ef9f](https://github.com/pplancq/svg-tools/commit/091ef9f25920efb13177f880a409aa10f26d1643))
* **svg-core:** use constant for SVG MIME type in getSvg function ([710cdb2](https://github.com/pplancq/svg-tools/commit/710cdb2187a018f3802cc174ab3fab5394665c84))

## @pplancq/svg-core [1.1.0](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.9...@pplancq/svg-core@1.1.0) (2025-03-17)

### Features

* **svg-core:** add support for inline SVG data URIs in getSvg function ([ad3e7b5](https://github.com/pplancq/svg-tools/commit/ad3e7b577fd83b940d2a0b2db305af820bdda6d6))

## @pplancq/svg-core [1.0.9](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.8...@pplancq/svg-core@1.0.9) (2025-02-04)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.4 ([77cb298](https://github.com/pplancq/svg-tools/commit/77cb2988f7596062c8be13e2e5d835a00328f2d5))

## @pplancq/svg-core [1.0.8](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.7...@pplancq/svg-core@1.0.8) (2024-12-16)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.3 ([46ee2bb](https://github.com/pplancq/svg-tools/commit/46ee2bb6aa77e9c10762e604879b9166c787f025))

## @pplancq/svg-core [1.0.7](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.6...@pplancq/svg-core@1.0.7) (2024-12-10)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.2 ([99d00e7](https://github.com/pplancq/svg-tools/commit/99d00e7d5cac64e05d73620ba9b09b2909e89023))

## @pplancq/svg-core [1.0.6](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.5...@pplancq/svg-core@1.0.6) (2024-11-26)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.1 ([e996a3c](https://github.com/pplancq/svg-tools/commit/e996a3c36c40c2441ba75db9e6237dda3be64bb5))

## @pplancq/svg-core [1.0.5](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.4...@pplancq/svg-core@1.0.5) (2024-11-18)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.2.0 ([1126689](https://github.com/pplancq/svg-tools/commit/1126689bbd2c87b1482f317f6e9e01e438503240))

## @pplancq/svg-core [1.0.4](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.3...@pplancq/svg-core@1.0.4) (2024-11-11)

### Bug Fixes

* **deps:** update dependency dompurify to ^3.1.7 ([7b4c296](https://github.com/pplancq/svg-tools/commit/7b4c2969fb5ce7b8bcbf0618ec4f127d95642e20))

## @pplancq/svg-core [1.0.3](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.2...@pplancq/svg-core@1.0.3) (2024-05-15)


### Bug Fixes

* fixed import and use of DOMPurify ([a12123f](https://github.com/pplancq/svg-tools/commit/a12123f184d0fd3fbe36e213c307e87610697204))

## @pplancq/svg-core [1.0.2](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.1...@pplancq/svg-core@1.0.2) (2024-05-14)


### Bug Fixes

* sanitize svg before merge in svgEl ([4db7e89](https://github.com/pplancq/svg-tools/commit/4db7e897844a0377259650d80db62e0d2961fcec))

## @pplancq/svg-core [1.0.1](https://github.com/pplancq/svg-tools/compare/@pplancq/svg-core@1.0.0...@pplancq/svg-core@1.0.1) (2024-05-07)


### Bug Fixes

* remove test on npm publish ([7e5ce7e](https://github.com/pplancq/svg-tools/commit/7e5ce7e207de978b5b297df4102127ccfd9e4822))

## @pplancq/svg-core 1.0.0 (2024-05-07)


### Features

* implement getSvg ([ca31482](https://github.com/pplancq/svg-tools/commit/ca314825ea8f686766b05fd9b1d8c04e0adbf576))


### Bug Fixes

* package type module and build typescript declaration ([b1a8998](https://github.com/pplancq/svg-tools/commit/b1a8998f0e75e70252524128d9e9b44a6d0d7bfc))
