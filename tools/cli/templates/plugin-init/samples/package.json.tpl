{
  "name": "{{moduleName}}-samples",
  "description": "Simple {{moduleName}} example",
  "license": "GPL-3.0",
  "version": "1.0.0",
  "private": true,
  "main": "index.html",
  "scripts": {
    "build": "parcel build index.html",
    "start": "parcel index.html"
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ],
  "dependencies": {
    "@pluginjs/{{moduleName}}": "*",
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
