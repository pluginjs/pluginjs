# @pluginjs

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 
[![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

## Installation
`Nodejs 8+` and `Yarn` are required, make sure Yarn version is up-to-date.

If you do not have yarn installed, follow https://yarnpkg.com/en/docs/install.

```sh
git clone https://github.com/pluginjs/pluginjs.git && cd pluginjs
yarn
```

## Usage

Run a development server:

```sh
npx plugin <moduleName>
# or npx plugin start <moduleName>
# or npx plugin run <moduleName>
```

Build production bundle:

```sh
npx plugin build <moduleName>
# or npx plugin b <moduleName>
npx plugin build all
```

Create a new plugin:

```sh
npx plugin new <moduleName>
```

Test by jest

```sh
## When execute test command first time
# npx plugin build all
npx plugin test <moduleName>
```

Generate samples

```sh
npx plugin samples <moduleName> --sections=foo,bar
```

Publish

```sh
npx plugin publish <moduleName> [--repo-version=x.x.x]
```

## Contributing Guide

Hi, Thank you for chooing Plugin.js

Plugin.js is a collection of modern JavaScript components.
We are excited that you are interested in contributing to us. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

## Pull Request Guide

- Fork this repository to your own account. Do not create branches here.
- Commit info reference [Commit Message Guidelines](COMMITMESSAGE.md).
- Make sure that running `yarn build` outputs the correct files.
- Rebase before creating a PR to keep commit history clear.
- Make sure PRs are created to `dev` branch instead of `master` branch
- If your PR fixes a bug, please provide a description about the related bug.
- Mergeing a PR takes two maintainers: one approves the changes after reviewing, and then the other reviews and merges.

## Issues Guide

- Before submitting an issue, please check if similar problems have already been issued.
- Please provide OS and browser information. [codesandbox](https://codesandbox.io/) is recommended to build a live demo so that your issue can be reproduced clearly.

## Code Style

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io)

## [CSS variables](CSSVARIABLES.md)

## [Commit Message Guidelines](COMMITMESSAGE.md)

## License

@pluginjs is Licensed under [the GPL-v3 license](LICENSE).

If you want to use @pluginjs project to develop commercial sites, themes, projects, and applications, the Commercial license is the appropriate license. With this option, your source code is kept proprietary.

For purchase an Commercial License, contact us purchase@thecreation.co.

## Copyright

Copyright (C) 2018 [Creation Studio Limited](creationstudio.com).