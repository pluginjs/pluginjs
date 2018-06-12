const Handlebars = require('handlebars')
const { readFileSync, writeFileSync } = require('fs')
const { execSync } = require('child_process')
const path = require('path')
const requireRc = require('./utils/require-rc-file')
const { findModule } = require('./utils')
const fs = require('fs')
const logger = require('@pluginjs/helper/logger')('scripts/build-md')

async function buildMd(ctx) {
  if (ctx.moduleName) {
    if (ctx.moduleName === 'all') {
      const total = ctx.fetchModuleList()
      logger.info('Total: ', total.length)
      const targets = total.filter(name =>
        fs
          .readdirSync(findModule(name))
          .find(name => name.match(/markdownrc/gi))
      )
      targets.forEach(moduleName => buildMd({ ...ctx, moduleName }))
      logger.info('Updated: ', targets.length)
      logger.info(
        'Not updated: ',
        total.filter(
          name =>
            !fs
              .readdirSync(findModule(name))
              .find(name => name.match(/markdownrc/gi))
        )
      )
      return ctx
    }
    const moduleName = ctx.scope
      ? `@${ctx.scope}/${ctx.moduleName}`
      : ctx.moduleName
    const command = `yarn workspace ${moduleName} build:md`
    return execSync(command, { stdio: 'inherit' })
  }
  const configPath = fs
    .readdirSync('.')
    .find(name => name.match(/markdownrc/gi))
  const markdownrc = await requireRc(path.resolve(configPath))
  return markdownrc.process(config => {
    const template = readFileSync(
      path.join(__dirname, `../templates/${config.template}.md`),
      'utf8'
    )
    const content = Handlebars.compile(template)(config.meta)
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&#x3D;/gi, '=')
      .replace(/&quot;/gi, '"')
      .replace(/&#x27;/gi, "'") // eslint-disable-line quotes
      .replace(/&#x60;/gi, '`')
    logger.success(
      `Created markdown file(${path.basename(path.resolve('.'))}) → ${
        config.output
      }`
    )
    return writeFileSync(config.output, content)
  })
}

module.exports = buildMd
