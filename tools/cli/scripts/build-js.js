const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('script/build')
const requireRc = require('./utils/require-rc-file')
const rollup = require('rollup')
const path = require('path')
const fs = require('fs-extra')
const getBanner = require('./utils/banner')

async function buildJs(ctx) {
  if (ctx.moduleName) {
    const moduleName = ctx.scope
      ? `@${ctx.scope}/${ctx.moduleName}`
      : ctx.moduleName
    const command = `yarn workspace ${moduleName} build:js`
    return execSync(command, { stdio: 'inherit' })
  }
  logger.title('plugin script build-js')
  if (!fs.existsSync(path.resolve('./dist'))) {
    fs.mkdirSync(path.resolve('./dist'))
  }
  const banner = getBanner()
  const rolluprc = await requireRc('./.rolluprc.js')
  await rolluprc.process(async config => {
    const { output, ...others } = config
    const bundle = await rollup.rollup(others)
    const { code } = await bundle.generate(output)

    logger.success(`Created js(${output.format}) → ${output.file}`)
    return fs.writeFileSync(path.resolve(output.file), `${banner}\n${code}`)
  })
  return ctx
}

module.exports = buildJs
