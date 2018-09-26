{
  "name": "{{moduleName}}-samples",
  "version": "1.0.0",
  "description": "Simple {{moduleName}} example",
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
    "@babel/core": "*",
    "@babel/preset-env": "*",
    "parcel-bundler": "*",
    "posthtml-include": "*"
  },
  "license": "GPL-3.0"
}
