{
  "name": "{{moduleName}}-samples",
  "version": "1.0.0",
  "description": "Simple {{moduleName}} example",
  "license": "GPL-3.0",
  "main": "index.html",
  "scripts": {
    "start": "parcel index.html --open --no-cache",
    "build": "parcel build index.html"
  },
  "dependencies": {
    "@pluginjs/{{moduleName}}": "^{{moduleVersion}}",
    "@pluginjs/dom": "*"
  },
  "devDependencies": {
    "@babel/core": "^7.1.2",
    "@babel/preset-env": "^7.1.0",
    "parcel-bundler": "^1.10.3",
    "posthtml-include": "*"
  }
}
