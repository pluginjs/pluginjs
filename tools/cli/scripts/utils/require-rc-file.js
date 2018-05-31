const Module = require('module')
const rollup = require('rollup')
const path = require('path')

async function requireRc(configPath) {
  const bundle = await rollup.rollup({
    input: configPath,
    external: id => {
      return (
        (id[0] !== '.' && !path.isAbsolute(id)) ||
        id.slice(-5, id.length) === '.json'
      )
    }
  })
  const { code } = await bundle.generate({
    format: 'cjs'
  })
  const paths = Module._nodeModulePaths(path.dirname(''))
  const parent = module.parent
  const m = new Module('', parent)
  m.filename = ''
  m.paths = paths
  m._compile(code, '')
  return m.exports
}

module.exports = requireRc
