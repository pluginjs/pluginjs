const { execSync } = require('child_process')

function publish(ctx) {
  // if (!ctx.moduleName && ctx.category) {
  //   logger.log('This feature is coming soon')
  // }

  // if (!ctx.moduleName || ctx.moduleName[0] === 'all') {
  //   const execCommand = 'npx lerna publish --skip-git --cd-version=patch --yes'
  //   return execSync(execCommand, {
  //     stdio: 'inherit'
  //   })
  // }
  const versionInfo = ctx.repoVersion
    ? `--repo-version=${ctx.repoVersion}`
    : '--cd-version=patch'
  const childProcessOptions = { stdio: 'inherit' }
  return ctx.moduleName
    .map(name => `@${ctx.scope}/${name}`)
    .forEach(moduleName => {
      execSync(`npx plugin build ${ctx.moduleName}`, childProcessOptions)
      execSync(
        `npx lerna publish \
        --scope=${moduleName} \
        --skip-git \
        --yes \
        ${versionInfo}`,
        childProcessOptions
      )
    })
}

module.exports = publish
