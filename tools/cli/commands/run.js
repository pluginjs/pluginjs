const { exportOptions } = require('@pluginjs/helper')
const { execSync } = require('child_process')

function run(context) {
  process.env.NODE_ENV = 'development'
  const options = exportOptions(
    ['port', 'slient', 'debug', 'moduleName'],
    context
  )
  const execOptions = {
    stdio: 'inherit'
  }
  execSync(`yarn workspace ${options.moduleName}-samples start`, execOptions)
}

module.exports = run
