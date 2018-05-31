const path = require('path')
const fs = require('fs')

class Pkg {
  constructor(rootPath) {
    this.pkgPath = path.join(rootPath, 'package.json')
    this.pkg = JSON.parse(fs.readFileSync(this.pkgPath, 'utf8'))
  }

  static read(rootPath) {
    return new Pkg(rootPath)
  }

  assign(key, data) {
    this.pkg[key] = { ...this.pkg[key], ...data }
    return this
  }

  addDependencies(dependencies) {
    return this.assign('dependencies', dependencies)
  }

  addScript(script) {
    return this.assign('scripts', script)
  }

  addField(key, value) {
    this.pkg[key] = value
    return this
  }

  removeField(key) {
    if (Array.isArray(key)) {
      key.forEach(k => delete this.pkg[k])
      return this
    }
    delete this.pkg[key]
    return this
  }

  dest() {
    const pkg = JSON.stringify(this.pkg, null, '\t')
    fs.writeFileSync(this.pkgPath, pkg)
    return this
  }
}

module.exports = Pkg.read
