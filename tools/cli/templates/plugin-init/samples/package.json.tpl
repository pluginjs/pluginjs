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
    "@babel/core": "^7.16.5",
    "@babel/preset-env": "^7.16.5",
    "@pluginjs/browserslist-config": "^1.3.2",
    "parcel": "^2.0.1",
    "posthtml-include": "^1.7.2"
  },
  "browserslist": [
    "extends @pluginjs/browserslist-config"
  ]
}
