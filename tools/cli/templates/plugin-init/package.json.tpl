{
  "name": "@pluginjs/{{moduleName}}",
  "description": "A flexible modern {{moduleName}} js plugin.",
  "license": "GPL-3.0",
  "author": "Creation Studio Limited",
  "homepage": "https://github.com/pluginjs/plugin.js",
  "version": "0.0.1",
  "main": "dist/{{moduleName}}.umd.js",
  "module": "dist/{{moduleName}}.esm.js",
  "cjs": "dist/{{moduleName}}.cjs.js",
  "source": "src/main.js",
  "css": {
    "source": "src/css/main.scss",
    "main": "dist/{{moduleName}}.css",
    "min": "dist/{{moduleName}}.min.css"
  },
  "scripts": {
    "build": "plugin build",
    "build:js": "plugin script build-js",
    "build:md": "plugin script build-md",
    "build:scss": "plugin script build-scss",
    "lint": "stylelint ./src/**/*.scss --fix && eslint ./src/**/*.js --fix",
    "test": "jest"
  },
  "dependencies": {
    "@pluginjs/component": "*",
    "@pluginjs/pluginjs": "*",
    "@pluginjs/decorator": "*",
    "@pluginjs/styles": "*"
  },
  "devDependencies": {
    "@pluginjs/cli": "*",
    "babel-jest": "*",
    "jest": "*",
    "jest-extended": "*",
    "rollup": "*",
    "rollup-plugin-babel": "^4.0.0-beta.7",
    "rollup-plugin-commonjs": "*",
    "rollup-plugin-node-resolve": "*"
  },
  "category": "{{category}}",
  "jest": {
    "setupTestFrameworkScriptFile": "jest-extended",
    "verbose": true,
    "testPathIgnorePatterns": [
      "fixtures"
    ]
  }
}
