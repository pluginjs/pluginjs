const globby = require('globby')
const { findModule, fetchRootPath } = require('./utils')
const path = require('path')
const fs = require('fs')
const logger = require('@pluginjs/helper/logger')('script/syncSource')

function syncSource(ctx) {
  const glob = ctx.glob || 'src/**/*.{scss,js,hbs}'
  const originRepo = path.resolve(ctx.originRepo)
  const rootPath = fetchRootPath()
  if (!ctx.moduleName) {
    const sourceList = globby
      .sync([`${path.join(rootPath, 'modules')}/*/${glob}`])
      .map(p => p.split(rootPath)[1])
    logger.success(`Copied: ${originRepo} → ${rootPath}`)
    logger.info(sourceList)
    return sourceList.forEach(p =>
      fs.copyFileSync(path.join(originRepo, p), path.join(rootPath, p))
    )
  }
  const name = ctx.moduleName
  const modulePath = findModule(name)
  const sourceList = globby
    .sync([`${modulePath}/${glob}`])
    .map(p => p.split(rootPath)[1])
  logger.success(`Copied: ${originRepo} → ${rootPath}`)
  logger.info(sourceList)
  return sourceList.forEach(p =>
    fs.copyFileSync(path.join(originRepo, p), path.join(rootPath, p))
  )
}

module.exports = syncSource
