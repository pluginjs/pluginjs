const path = require('path')
const fs = require('fs')
const globby = require('globby')

function fetchRootPath() {
  return path.join(__dirname, '../../../..')
}

function findModule(name) {
  const pkgPath = globby.sync([
    `${fetchRootPath()}/modules/**/${name}/package.json`
  ])[0]
  return path.dirname(pkgPath)
}

function fetchModuleList() {
  return globby
    .sync([`${fetchRootPath()}/modules/*/package.json`])
    .map(p => path.basename(path.dirname(p)))
}

function fetchSamplesList() {
  return globby
    .sync([`${fetchRootPath()}/modules/*/samples/package.json`])
    .map(p => path.basename(path.dirname(p)))
}

const scope = JSON.parse(fs.readFileSync('./package.json')).scope

module.exports = {
  fetchSamplesList,
  fetchModuleList,
  fetchRootPath,
  findModule,
  scope
}
