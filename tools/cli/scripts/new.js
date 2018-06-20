const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const Handlebars = require('handlebars')
const inquirer = require('inquirer')
const logger = require('@pluginjs/helper/logger')('script/new')
const { fetchRootPath } = require('./utils')
const { camelCase, capitalizeFirstLetter } = require('@pluginjs/helper')
const { execSync } = require('child_process')

async function initPlugin(ctx) {
  const moduleName = ctx.moduleName
  if (!moduleName) {
    throw new Error('Please enter valid name')
  }
  const templatePath = path.join(__dirname, '../templates/plugin-init')
  const rootPath = fetchRootPath()
  const targetPath = path.join(rootPath, `modules/${moduleName}`)
  const structre = `
  Name: ${moduleName}
  Path: ${targetPath}

  ┌── __tests__
  │     ├── fixtures
  │     │     └── sample.js
  │     └── ${moduleName}.spec.js
  ├── samples
  │     ├── src
  │     ├── index.html
  │     └── package.json
  ├── src
  │     ├── index.js
  │     └── css
  │          └── ${moduleName}.scss
  ├── .rolluprc.js
  ├── .sassrc.js
  ├── .markdownrc.js
  ├── .babelrc
  └── package.json
  `
  if (!fs.pathExistsSync(targetPath)) {
    await fs.copy(templatePath, targetPath)
  }
  await globby(`${targetPath}/**/*{{moduleName}}*`).then(pathList =>
    pathList.map(p =>
      fs.renameSync(p, p.replace(/{{moduleName}}/g, moduleName))
    )
  )
  const tplFilesPath = await globby(`${targetPath}/**/*.tpl`)
  const questions = await fs
    .readJson(path.join(targetPath, 'meta.json'))
    .then(meta => {
      return Object.entries(meta)
        .filter(
          ([name]) => !['namespace', 'Namespace', 'moduleName'].includes(name)
        )
        .map(([name, message]) => {
          return {
            type: 'input',
            name,
            message
          }
        })
    })
  const anwser = await inquirer.prompt(questions)
  const namespace = camelCase(moduleName)
  const data = {
    ...anwser,
    moduleName,
    namespace,
    Namespace: capitalizeFirstLetter(namespace)
  }
  const tplPromises = tplFilesPath.map(async tpl => {
    const code = await fs.readFile(tpl, 'utf8')
    const result = Handlebars.compile(code)(data)
    await fs.writeFile(
      path.join(path.dirname(tpl), path.basename(tpl, '.tpl')),
      result,
      'utf8'
    )
    return fs.remove(tpl)
  })
  const configsPromise = ['.babelrc.plugin', '.rolluprc.js', '.sassrc.js'].map(
    name =>
      fs.copy(
        path.join(__dirname, '../config', name),
        path.join(targetPath, path.basename(name, '.plugin'))
      )
  )
  await Promise.all(
    tplPromises
      .concat(configsPromise)
      .concat(fs.remove(path.join(targetPath, 'meta.json')))
  )

  execSync('yarn', {
    stdio: 'inherit'
  })

  logger.info(structre)
}

module.exports = initPlugin
