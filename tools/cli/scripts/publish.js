const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('script/publish')

function publish(ctx) {
  if (!ctx.moduleName && ctx.category) {
    logger.log('This feature is coming soon')
  }

  if (!ctx.moduleName || ctx.moduleName === 'all') {
    const execCommand = 'npx lerna publish --skip-git --cd-version=patch --yes'
    return execSync(execCommand, {
      stdio: 'inherit'
    })
  }

  const moduleName = ctx.scope
    ? `@${ctx.scope}/${ctx.moduleName}`
    : ctx.moduleName
  const execCommand = `npx lerna publish --scope=${moduleName} --skip-git`
  return execSync(execCommand, {
    stdio: 'inherit'
  })
}

module.exports = publish
