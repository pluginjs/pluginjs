const path = require('path')
const pkg = require(path.resolve('./package.json'))
const year = new Date().getFullYear()

function getBanner() {
  return (
    '/*!\n' +
    ` * ${pkg.name} v${pkg.version} (${pkg.homepage})\n` +
    ` * Copyright ${year} ${pkg.author}\n` +
    ` * Released under the ${pkg.license} License.\n` +
    ' */'
  )
}

module.exports = getBanner
