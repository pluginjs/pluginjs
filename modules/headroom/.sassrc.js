const pkg = require('./package.json')

module.exports = {
  input: pkg.css.source,
  includePaths: ['../../node_modules', 'node_modules'],
  output: [
    { outputStyle: 'nested', file: pkg.css.min },
    { outputStyle: 'compressed', file: pkg.css.main }
  ]
}
