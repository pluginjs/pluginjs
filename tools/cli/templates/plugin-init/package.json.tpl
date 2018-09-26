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
    "lint:scss": "stylelint ./src/**/*.scss --fix",
    "lint:js": "eslint ./src/**/*.js --fix",
    "lint": "npm run lint:js & npm run lint:scss",
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
    "@pluginjs/cli": "*",
    "@babel/core": "^7.1.0",
    "babel-jest": "*",
    "jest": "*",
    "jest-extended": "*",
    "rollup": "*",
    "rollup-plugin-babel": "*",
    "rollup-plugin-commonjs": "*",
    "rollup-plugin-node-resolve": "*"
  },
  "category": "{{category}}",
  "jest": {
    "setupTestFrameworkScriptFile": "jest-extended",
    "verbose": true,
    "testURL": "http://localhost",
    "testPathIgnorePatterns": [
      "fixtures"
    ]
  }
}
