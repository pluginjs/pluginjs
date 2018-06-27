const pkg = require('./package.json')
const path = require('path')

const includePaths = [
  '../../node_modules',
  'node_modules',
  '../../../../'
].map(includePath => path.resolve(includePath))
module.exports = {
  input: pkg.css.source,
  includePaths: includePaths,
  output: [
    { outputStyle: 'nested', file: pkg.css.min },
    { outputStyle: 'compressed', file: pkg.css.main }
  ]
}
