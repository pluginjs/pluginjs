const { fetchModuleList, findModule } = require('./utils')
const fetchPkg = require('./utils/package-utils')

const options = {
  rollup: '^0.59.2',
  'rollup-plugin-babel': '^4.0.0-beta.4',
  'rollup-plugin-commonjs': '^9.1.3',
  'rollup-plugin-node-resolve': '^3.3.0',
  '@pluginjs/cli': '^0.5.18'
}

function migrate(ctx) {
  if (!ctx.moduleName || ctx.moduleName === 'all') {
    return fetchModuleList()
      .filter(name => !['styles', 'icons'].includes(name))
      .map(moduleName => migrate({ ...ctx, moduleName }))
  }
  const name = ctx.moduleName
  const pkg = fetchPkg(findModule(name))
  return pkg
    .reduce(
      'dependencies',
      (result, [key, value]) => {
        if (Object.keys(options).includes(key)) {
          return result
        }
        return { ...result, [key]: value }
      },
      {}
    )
    .assign('devDependencies', options)
    .dest()
}

module.exports = migrate
