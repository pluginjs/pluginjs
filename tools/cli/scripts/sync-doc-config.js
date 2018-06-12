const fetchPkg = require('./utils/package-utils')
const { findModule, fetchModuleList } = require('./utils')

function syncTestConfig(ctx) {
  if (!ctx.moduleName || ctx.moduleName === 'all') {
    return fetchModuleList().map(moduleName =>
      syncTestConfig({ ...ctx, moduleName })
    )
  }
  const name = ctx.moduleName
  const pkg = fetchPkg(findModule(name))
  return pkg.assign('scripts', { 'build:md': 'plugin script build-md' }).dest()
}

module.exports = syncTestConfig
