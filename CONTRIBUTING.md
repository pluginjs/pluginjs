# Contributing Guide
Hi, Thank you for chooing Plugin.js
Plugin.js is a collection of modern JavaScript components.
We are excited that you are interested in contributing to us. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

# Pull Request Guide
- Fork this repository to your own account. Do not create branches here.
- Commit info should be formatted as `[Component name]: info about commit.`(e.g. `Slider: Fix xxx bug`)
- Make sure that running `npm run dist` outputs the correct files.
- Rebase before creating a PR to keep commit history clear.
- Make sure PRs are created to `dev` branch instead of `master` branch
- If your PR fixes a bug, please provide a description about the related bug.
- Mergeing a PR takes two maintainers: one approves the changes after reviewing, and then the other reviews and merges.

# Issues Guide
- Before submitting an issue, please check if similar problems have already been issued.
- Please provide OS and browser information. [JSFiddle](https://jsfiddle.net/) is recommended to build a live demo so that your issue can be reproduced clearly.

# Component Developing Guidelines
`Nodejs 8+` and `NPM 3+` are required.
```shell
git clone git@github.com:amazingsurge/pluginjs.git
cd pluginjs
npm i
```
For Chinese users, you can use [nrm](https://github.com/Pana/nrm) easy and fast switch other npm registries.
```
npm i -g nrm
nrm use taobao
```

# Code Style
- [ESLint]()
- [Stylelint]()