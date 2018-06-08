const { execSync } = require('child_process')

function test(context) {
  const execOptions = {
    stdio: 'inherit'
  }
  execSync(
    `yarn workspace @${context.scope}/${context.moduleName} test`,
    execOptions
  )
}

module.exports = test
