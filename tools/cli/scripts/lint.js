const { execSync } = require('child_process')
// const { logger } = require('@pluginjs/helper/logger')('script/lint')

function lint(ctx) {
  // if (!ctx.moduleName && ctx.category) {
  //   logger.log('This feature is coming soon')
  // }
  const execName = [
    {
      name: 'eslint',
      ext: 'js'
    },
    {
      name: 'stylelint',
      ext: 'scss'
    }
  ]
  const commands = moduleName =>
    execName.map(
      ({ name, ext }) =>
        `npx ${name} ./modules/${moduleName || '*'}/src/**/*.${ext}`
    )
  if (!ctx.moduleName || ctx.moduleName[0] === 'all') {
    commands().map(command => execSync(command, { stdio: 'inherit' }))
  }
  commands(ctx.moduleName).map(command =>
    execSync(command, { stdio: 'inherit' })
  )
}

module.exports = lint
