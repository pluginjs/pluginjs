const { execSync } = require('child_process')
const buildJs = require('./build-js')
const buildScss = require('./build-scss')
const fs = require('fs')

function build(ctx) {
  if (ctx.moduleName) {
    if (ctx.moduleName === 'all') {
      return ctx
        .fetchModuleList()
        .filter(name => name !== 'styles')
        .forEach(moduleName => build({ ...ctx, moduleName }))
    }
    const moduleName = ctx.scope
      ? `@${ctx.scope}/${ctx.moduleName}`
      : ctx.moduleName
    const execCommand = `yarn workspace ${moduleName} run -s build`
    return execSync(execCommand, {
      stdio: 'inherit'
    })
  }
  return buildJs(ctx).then(
    ctx => fs.existsSync('./.sassrc.js') && buildScss(ctx)
  )
}

module.exports = build
