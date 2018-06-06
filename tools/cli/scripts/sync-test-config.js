const fetchPkg = require('./utils/package-utils')
const { findModule } = require('./utils')

const jestOptions = {
  jest: {
    setupTestFrameworkScriptFile: 'jest-extended',
    verbose: true,
    testPathIgnorePatterns: ['fixtures']
  }
}
function syncTestConfig(ctx) {
  const name = ctx.moduleName
  const pkg = fetchPkg(findModule(name))
  pkg
    .merge(jestOptions)
    .assign('devDependencies', {
      'babel-jest': '^23.0.1',
      jest: '^23.1.0',
      'jest-extended': '^0.7.2'
    })
    .assign('scripts', { test: 'jest' })
    .dest()
}

module.exports = syncTestConfig
