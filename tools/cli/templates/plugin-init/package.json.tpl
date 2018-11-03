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
    "@pluginjs/browserslist-config": "*",
    "@babel/core": "^7.1.2",
    "@pluginjs/cli": "*",
    "babel-jest": "*",
    "jest": "*",
    "jest-extended": "*",
    "rollup": "*",
    "rollup-plugin-babel": "*",
    "rollup-plugin-uglify": "*",
    "rollup-plugin-commonjs": "*",
    "rollup-plugin-node-resolve": "*"
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ],
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
