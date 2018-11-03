const sass = require('node-sass')
const fs = require('fs')
const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('scripts/build-scss')
const path = require('path')
const requireRc = require('./utils/require-rc-file')
const { writeFileSync } = require('fs')
const getBanner = require('./utils/banner')

async function buildScss(ctx) {
  if (ctx.moduleName) {
    const moduleName = ctx.scope
      ? `@${ctx.scope}/${ctx.moduleName}`
      : ctx.moduleName
    const command = `yarn workspace ${moduleName} build:scss`
    return execSync(command, { stdio: 'inherit' })
  }
  logger.title('plugin script build-scss')
  if (!fs.existsSync(path.resolve('./dist'))) {
    fs.mkdirSync(path.resolve('./dist'))
  }
  const banner = getBanner()
  const sassrc = await requireRc(path.resolve('./.sassrc.js'))
  await sassrc.process(config => {
    const {
      input,
      output: { file, ...othersOutputOptions },
      ...others
    } = config
    const { css } = sass.renderSync({
      file: input,
      ...others,
      ...othersOutputOptions
    })
    logger.success(`Created css(${othersOutputOptions.outputStyle}) → ${file}`)
    return writeFileSync(file, `${banner}\n${css}`)
  })
  return ctx
}

module.exports = buildScss
