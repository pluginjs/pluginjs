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
      '@pluginjs/dom': '*'
    },
    devDependencies: {
      '@babel/core': '^7.1.2',
      '@babel/preset-env': '^7.1.0',
      '@pluginjs/browserslist-config': '*',
      'parcel-bundler': '^1.10.3',
      'posthtml-include': '*'
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
