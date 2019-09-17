{
  "private": true,
  "name": "{{moduleName}}-samples",
  "description": "Simple {{moduleName}} example",
  "license": "GPL-3.0",
  "version": "1.0.0",
  "main": "index.html",
  "scripts": {
    "build": "parcel build index.html",
    "start": "parcel index.html --open"
  },
  "dependencies": {
    "@pluginjs/{{moduleName}}": "*",
    "@pluginjs/dom": "*"
  },
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "@pluginjs/browserslist-config": "^1.2.10",
    "parcel-bundler": "^1.12.3",
    "posthtml-include": "*"
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ]
}
