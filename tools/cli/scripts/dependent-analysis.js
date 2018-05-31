const { nub, nubWith } = require('@pluginjs/helper/data.array')
const { findModule } = require('./utils')
const path = require('path')
const fs = require('fs')

function readDependenciesFromPackageJson(name) {
  const packageOptions = readPackageJson(name)
  const dependencies = nub(
    ['dependencies', 'peerDependencies'].reduce((dependencies, key) => {
      const items = packageOptions[key] || {}
      const keys = Object.keys(items).filter(name => name.match(/pluginjs/gi))
      return dependencies.concat(keys)
    }, [])
  ).map(name => name.replace(/@pluginjs\//g, ''))
  return {
    dependencies,
    category: packageOptions.category
  }
}

function readPackageJson(name) {
  const modulePath = findModule(name)
  return JSON.parse(fs.readFileSync(path.join(modulePath, 'package.json')))
}

function relationshipGeneration(name) {
  const {
    category,
    dependencies: readDependenciesResult
  } = readDependenciesFromPackageJson(name)
  if (readDependenciesResult.length) {
    const dependencies = readDependenciesResult.map(relationshipGeneration)
    return {
      name,
      dependencies,
      level: Math.max(...dependencies.map(({ level }) => level)) + 1,
      category
    }
  }

  return {
    name,
    category,
    dependencies: [],
    level: 0
  }
}

function generateOnionMap(dependent) {
  if (!dependent.level) {
    return []
  }
  const onion = Array(dependent.level).fill([])
  function mapTree(dependencies) {
    return dependencies.map(dep => {
      const { level, name, category } = dep
      onion[level] = [
        ...onion[level],
        {
          name,
          category
        }
      ]
      if (dep.dependencies.length) {
        return mapTree(dep.dependencies)
      }
      return onion
    })
  }
  mapTree(dependent.dependencies)
  return onion.map(arr =>
    nubWith(
      (result, item) => result.map(({ name }) => name).includes(item.name),
      arr
    )
  )
}

module.exports = {
  relationshipGeneration,
  generateOnionMap
}
