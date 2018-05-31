const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('cli/run')

function run(context) {
  process.env.NODE_ENV = 'development'
  const execOptions = {
    stdio: 'inherit'
  }
  logger.clear()
  execSync(`yarn workspace ${context.moduleName}-samples start`, execOptions)
}

module.exports = run
