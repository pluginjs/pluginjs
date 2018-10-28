const { execSync } = require('child_process')

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
}

module.exports = build
