{
  "name": "@pluginjs/{{moduleName}}",
  "description": "A flexible modern {{moduleName}} js plugin.",
  "license": "GPL-3.0",
  "author": "Creation Studio Limited",
  "homepage": "https://pluginjs.com",
  "repository": {
    "url": "git@github.com:pluginjs/pluginjs.git",
    "type": "git"
  },
  "bugs": {
    "url": "https://github.com/pluginjs/pluginjs/issues"
  },
  "version": "0.0.1",
  "category": "ui",
  "main": "dist/{{moduleName}}.common.js",
  "module": "dist/{{moduleName}}.esm.js",
  "umd": "dist/{{moduleName}}.js",
  "unpkg": "dist/{{moduleName}}.js",
  "jsdelivr": "dist/{{moduleName}}.js",
  "source": "src/main.js",
  "style": "dist/{{moduleName}}.css",
  "sass": "src/css/{{moduleName}}.scss",
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "build": "npm run build:js & npm run build:scss",
    "build:js": "plugin script build-js",
    "build:md": "plugin script build-md",
    "build:scss": "plugin script build-scss",
    "lint": "npm run lint:js && npm run lint:scss",
    "lint:js": "eslint ./src/**/*.js --fix",
    "lint:scss": "stylelint ./src/**/*.scss --fix",
    "prepublishOnly": "npm run build",
    "test": "jest"
  },
  "dependencies": {
    "@pluginjs/classes": "*",
    "@pluginjs/component": "*",
    "@pluginjs/dom": "*",
    "@pluginjs/events": "*",
    "@pluginjs/is": "*",
    "@pluginjs/decorator": "*"
  },
  "devDependencies": {
    "@babel/core": "^7.16.7",
    "@pluginjs/browserslist-config": "^1.3.2",
    "@pluginjs/cli": "^0.8.4",
    "@rollup/plugin-commonjs": "^21.0.1",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "babel-jest": "^27.4.6",
    "jest": "^27.4.7",
    "jest-extended": "^1.2.0",
    "rename": "^1.0.4",
    "rollup": "^2.63.0",
    "@rollup/plugin-babel": "^5.3.0",
    "rollup-plugin-terser": "^7.0.2"
  },
  "engines": {
    "node": ">= 8",
    "npm": ">= 5"
  },
  "jest": {
    "setupTestFrameworkScriptFile": "jest-extended",
    "verbose": true,
    "testURL": "http://localhost",
    "testPathIgnorePatterns": [
      "fixtures"
    ]
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ]
}
