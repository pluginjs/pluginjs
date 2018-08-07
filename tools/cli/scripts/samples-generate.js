const { camelCase, capitalizeFirstLetter } = require('@pluginjs/helper')
const { findModule } = require('./utils')
const fs = require('fs-extra')
const path = require('path')
const Handlebars = require('handlebars')
const globby = require('globby')
const logger = require('@pluginjs/helper/logger')('script/samples-generator')
const readPkg = require('./utils/package-utils')

async function generator(ctx) {
  const moduleName = ctx.moduleName
  const modulePath = findModule(ctx.moduleName)
  const sections = ctx.sections.split(',')
  const namespace = camelCase(moduleName)
  const commonMeta = {
    moduleName,
    namespace,
    Namespace: capitalizeFirstLetter(namespace)
  }
  const metaBesideSections = {
    ...commonMeta,
    importSections: sections
      .map(name => {
        return `import './sections/${name}'`
      })
      .join('\n'),
    htmlSections: sections
      .map(name => {
        return `  <section id="${name}">
    <include src="src/sections/${name}/index.html"></include>
  </section>`
      })
      .join('\n'),
    moduleVersion: readPkg(modulePath).pkg.version
  }
  const targetPath = path.join(modulePath, 'samples')
  const templatePath = path.join(__dirname, '../templates/plugin-samples')
  const sectionsPath = path.join(targetPath, 'src/sections')
  const sectionTemplate = await fs.readFile(
    path.join(__dirname, '../templates/sample-section.js.tpl'),
    'utf8'
  )
  await fs.copy(templatePath, targetPath)
  const tplList = await globby(path.join(targetPath, './**/*.tpl'))
  await Promise.all(
    tplList.map(async tpl => {
      const code = await fs.readFile(tpl, 'utf8')
      const result = Handlebars.compile(code, { noEscape: true })(
        metaBesideSections
      )
      await fs.writeFile(
        path.join(path.dirname(tpl), path.basename(tpl, '.tpl')),
        result,
        'utf8'
      )
      return fs.remove(tpl)
    })
  ).catch(err => {
    logger.error(err)
    logger.info('Failed in generate samples')
  })
  await Promise.all(
    sections.map(async name => {
      const code = Handlebars.compile(sectionTemplate, { noEscape: true })({
        ...commonMeta,
        sectionName: name
      })
      const sectionPath = path.join(sectionsPath, name)
      if (!fs.pathExistsSync(sectionPath)) {
        await fs.mkdir(sectionPath)
      }
      await fs.writeFile(path.join(sectionPath, 'index.html'), '')
      await fs.writeFile(path.join(sectionPath, 'index.js'), code)
      return
    })
  ).catch(err => {
    logger.error(err)
    logger.info('Failed in generate sections')
  })
  await fs.remove(path.join(targetPath, 'meta.json'))
  logger.success(`Samples has generated.(${moduleName})`)
}

module.exports = generator
