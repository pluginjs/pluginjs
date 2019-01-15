{
  "name": "{{moduleName}}-samples",
  "version": "1.0.0",
  "private": true,
  "description": "Simple {{moduleName}} example",
  "license": "GPL-3.0",
  "main": "index.html",
  "scripts": {
    "start": "parcel index.html --open --no-cache",
    "build": "parcel build index.html"
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ],
  "dependencies": {
    "@pluginjs/{{moduleName}}": "^{{moduleVersion}}",
    "@pluginjs/dom": "*"
  },
  "devDependencies": {
    "@pluginjs/browserslist-config": "*",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.2.3",
    "parcel-bundler": "^1.11.0",
    "posthtml-include": "*"
  }
}
