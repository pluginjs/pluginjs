const pkg = require('./package.json')
const path = require('path')
const rename = require('rename')

module.exports = {
  input: pkg.source,
  includePaths: [path.join(__dirname, '../../node_modules'), 'node_modules'],
  output: [
    { outputStyle: 'nested', file: pkg.style },
    { outputStyle: 'compressed', file: rename(pkg.style, {suffix: '.min'}) }
  ]
}
