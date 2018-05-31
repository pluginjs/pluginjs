const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('script/build')
const requireRc = require('./utils/require-rc-file')
const rollup = require('rollup')

async function buildJs(ctx) {
  if (ctx.moduleName) {
    const moduleName = ctx.scope
      ? `@${ctx.scope}/${ctx.moduleName}`
      : ctx.moduleName
    const command = `yarn workspace ${moduleName} build:scss`
    return execSync(command, { stdio: 'inherit' })
  }
  logger.title('plugin script build-js')
  const rolluprc = await requireRc('./.rolluprc.js')
  await Promise.all(
    [].concat(rolluprc).map(async task => {
      const { output, ...inputOptions } = task
      const bundle = await rollup.rollup(inputOptions)
      return [].concat(output).map(outOps => {
        logger.success(`Created js(${outOps.format}) → ${outOps.file}`)
        return bundle.write(outOps)
      })
    })
  )
  return ctx
}

module.exports = buildJs
