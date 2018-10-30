const pkg = require('./package.json')
const path = require('path')

module.exports = {
  input: pkg.css.source,
  includePaths: [
    path.join(__dirname, '../../node_modules'), // github.com/pluginjs/pluginjs
    'node_modules'
  ],
  output: [
    { outputStyle: 'nested', file: pkg.css.main },
    { outputStyle: 'compressed', file: pkg.css.min }
  ]
}
