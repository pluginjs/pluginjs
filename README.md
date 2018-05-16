# pluginjs
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
## Installation
```sh
git clone https://github.com/amazingSurge/plugin.js.git
yarn run bootstrap
```
---
## Usage:
```sh
npx plugin -h
npx plugin run <module>
```

## Command

- `docs <module>`
- `test <module>`
- `run <module>`
- `build <module>`
- `lint <module>`
- `commit analysis`
- `dependencies`

## Docs:
Building doc.

**example:**
```sh
npx plugin docs <module>
```
### `-u, --update`
Update doc by cache and template

**example:**
```sh
npx plugin docs <module> [ -u | --update ]
```


## Test:
Run Unit-Test.

**example:**
```sh
npx plugin test <module>
```
### `-b, --build-test`
**example:**
```sh
npx plugin test <module> [ -b | --build-test ]
```
### `-d, --dependencies-rebuild`
**example:**
```sh
npx plugin test <module> [ -d | --dependencies-rebuild ]
```


## Run:
Run plugin.

**example:**
```sh
npx plugin run <module>
```
### `-d, --dependencies-rebuild`
Rebuild all dependencies

**example:**
```sh
npx plugin run <module> [ -d | --dependencies-rebuild ]
```
### `-c, --core-rebuild`
Rebuild core

**example:**
```sh
npx plugin run <module> [ -c | --core-rebuild ]
```
### `-o, --open`
Run and open browser

**example:**
```sh
npx plugin run <module> [ -o | --open ]
```

## Build:
Bundle plugin

Build all format bundle
**example:**
```sh
npx plugin build <module>
```
### `-e, --es`
ES format

**example:**
```sh
npx plugin build <module> [ -e | --es ]
```
minify

**example:**
```sh
npx plugin build <module> [ -m | --min ]
```
umd format

**example:**
```sh
npx plugin build <module> [ -u | --umd ]
```


## Dependencies
Building dependencies.(assets, icon, common css, js)

**example**
```sh
npx plugin dependencies
```


## Commit analysis
Analysis what plugin will be commit from git.

**example**
```sh
npx plugin dependencies
```