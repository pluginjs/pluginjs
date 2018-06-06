const { findModule } = require('./utils')
const fetchPkg = require('./utils/package-utils')
const fs = require('fs')
const path = require('path')

function syncSamplesPkg(ctx) {
  const name = ctx.moduleName
  const pkgName = name
    .split('-')
    .slice(0, -1)
    .join('-')
  const version = fetchPkg(findModule(pkgName)).pkg.version
  const pkgConfig = {
    dependencies: {
      [`@pluginjs/${pkgName}`]: `^${version}`,
      '@pluginjs/dom': '^0.0.15'
    },
    devDependencies: {
      'babel-core': '^6.26.3',
      'babel-preset-env': '1.7.0',
      'babel-plugin-transform-html-import-to-string': '^0.0.1',
      'parcel-bundler': '^1.6.1'
    }
  }
  const samplePkg = fetchPkg(findModule(`${pkgName}/samples`))
  samplePkg.merge(pkgConfig).dest()
  fs.copyFileSync(
    path.join(__dirname, '../config/.babelrc'),
    path.join(path.dirname(samplePkg.pkgPath), '.babelrc')
  )
}

module.exports = syncSamplesPkg
