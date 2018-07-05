{
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
    "babel-core": "^6.26.3",
    "babel-preset-env": "1.7.0",
    "babel-plugin-transform-html-import-to-string": "^0.0.1",
    "parcel-bundler": "*"
  }
}
