const fs = require('fs')
const path = require('path')
const logger = require('@pluginjs/helper/logger')('script/add-build-script')
const { findModule, fetchModuleList } = require('./utils')
const fetchPkg = require('./utils/package-utils')
const dependentList = {
  'rollup-plugin-babel': '^4.0.0-beta.4',
  'rollup-plugin-commonjs': '^9.1.3',
  'rollup-plugin-node-resolve': '^3.3.0',
  '@pluginjs/cli': '^0.5.18'
}

const script = {
  build: 'plugin build',
  'build:js': 'plugin script build-js'
}

function migrate(ctx) {
  if (ctx.moduleName === 'all') {
    return fetchModuleList()
      .filter(name => !['styles', 'icons'].includes(name))
      .map(name => migrate({ ...ctx, moduleName: name }))
  }
  const name = ctx.moduleName
  const modulePath = findModule(name)
  const pkg = fetchPkg(modulePath)
  pkg.addDependencies(dependentList)
  logger.log(`
    --> package.json modification succeeded
    --> add scripts: 
      {
        "build": "plugin build",
        "build:scss": "plugin script build-scss"
      }
    --> add dependencies:
      {
        "rollup-plugin-babel": "^4.0.0-beta.4",
        "rollup-plugin-commonjs": "^9.1.3",
        "rollup-plugin-node-resolve": "^3.3.0",
        "@pluginjs/cli": "^0.5.18"
      }
    --> add Field:
      main: dist/${name}.umd.js,
      cjs: dist/${name}.cjs.js
    `)
  fs.copyFileSync(
    path.join(__dirname, '../config/.rolluprc.js'),
    path.join(modulePath, '.rolluprc.js')
  )
  script.lint = 'eslint ./src/**/*.js --fix'
  logger.log(`--> copy .rolluprc.js from configs to ${name}`)
  if (fs.existsSync(path.join(modulePath, 'src/css'))) {
    fs.copyFileSync(
      path.join(__dirname, '../config/.sassrc.js'),
      path.join(modulePath, '.sassrc.js')
    )
    script['build:scss'] = 'plugin script build-scss'
    script.lint =
      'stylelint ./src/**/*.scss --fix && eslint ./src/**/*.js --fix'
    pkg.assign('css', {
      source: `src/css/${name}.scss`,
      main: `dist/${name}.css`,
      min: `dist/${name}.min.css`
    })
    logger.log(`--> copy .sassrc.js from configs to ${name}`)
  }
  pkg
    .addField('cjs', `dist/${name}.cjs.js`)
    .addField('main', `dist/${name}.umd.js`)
    .removeField(['min', 'standalone', 'dev-main', 'browser'])
    .addScript(script)
    .dest()
  return true
}

module.exports = migrate
