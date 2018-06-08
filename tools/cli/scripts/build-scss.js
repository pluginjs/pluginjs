const sass = require('node-sass')
const fs = require('fs')
const { execSync } = require('child_process')
const logger = require('@pluginjs/helper/logger')('scripts/build-scss')
const path = require('path')

function buildScss(ctx) {
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
  const { input, output, ...options } = require(path.resolve('./.sassrc.js'))
  Array.of()
    .concat(output)
    .map(task => {
      const { file, ...outputOps } = task
      const { css } = sass.renderSync({
        file: input,
        ...options,
        ...outputOps
      })
      logger.success(`Created css(${outputOps.outputStyle}) → ${file}`)
      return fs.writeFileSync(file, css)
    })
  return Promise.resolve(ctx)
}

module.exports = buildScss
