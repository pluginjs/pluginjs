const path = require('path')
const fs = require('fs')

function fetchRootPath() {
  return path.join(__dirname, '../../../..')
}

function findModule(name) {
  return path.join(fetchRootPath(), 'modules', name)
}

function fetchModuleList() {
  const modulesPath = path.join(fetchRootPath(), 'modules')
  return fs.readdirSync(modulesPath)
}

const scope = JSON.parse(fs.readFileSync('./package.json')).scope

module.exports = {
  fetchModuleList,
  fetchRootPath,
  findModule,
  scope
}
