const path = require('path')
const fs = require('fs')
const external = require('../config/external')

function sync(ctx) {
  const syncGlobalsToPkg = modulePath => {
    const pkgPath = path.join(modulePath, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    const IS_PLUGINJS_REG = /@pluginjs/
    if (!pkg.dependencies) {
      return
    }
    const thirdPkg = Object.keys(pkg.dependencies).filter(
      name => !IS_PLUGINJS_REG.test(name)
    )
    if (!thirdPkg.length) {
      return
    }
    const globals = thirdPkg.reduce((result, name) => {
      if (external[name]) {
        result[name] = external[name]
      }
      return result
    }, {})
    pkg.globals = globals
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t'))
  }
  if (!ctx.moduleName || ctx.moduleName === 'all') {
    const moduleList = ctx.fetchModuleList()
    return moduleList.forEach(syncGlobalsToPkg)
  }
  return syncGlobalsToPkg(ctx.findModule(ctx.moduleName))
}

module.exports = sync
