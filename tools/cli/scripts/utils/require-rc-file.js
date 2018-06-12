const Module = require('module')
const rollup = require('rollup')
const path = require('path')
const { readFileSync } = require('fs')

class Config {
  constructor({ configPath, config }) {
    this.path = configPath
    this.config = config
  }

  static async require(configPath) {
    const config = await Config.parse(configPath)
    return new Config({ configPath, config })
  }

  static parse(configPath) {
    if (path.extname(configPath) === '.js') {
      return AssetsJS(configPath)
    }
    return AssetsJSON(configPath)
  }

  async process(runTask) {
    const result = await Promise.all(
      Array.of()
        .concat(this.config)
        .map(config => {
          if (!config.output) {
            return runTask(config)
          }
          return Promise.all(
            Array.of()
              .concat(config.output)
              .map(output => runTask({ ...config, output }))
          )
        })
    )
    if (result.length === 1) {
      return result[0]
    }
    return result
  }
}
function requireFromString(code) {
  const paths = Module._nodeModulePaths(path.dirname(''))
  const parent = module.parent
  const m = new Module('', parent)
  m.filename = ''
  m.paths = paths
  m._compile(code, '')
  return m.exports
}

async function AssetsJS(configPath) {
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
  return requireFromString(code)
}

function AssetsJSON(configPath) {
  const str = readFileSync(configPath, 'utf8')
  return JSON.parse(str)
}

module.exports = Config.require
