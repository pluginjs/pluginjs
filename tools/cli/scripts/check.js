const {
  relationshipGeneration,
  generateOnionMap
} = require('./dependent-analysis')

function check(ctx) {
  const name = ctx.moduleName
  const relationship = relationshipGeneration(name)
  const onion = generateOnionMap(relationship)
  const dependentList = onion.reduce((a, b) => a.concat(b)).map(m => m.name)
  return dependentList
}

module.exports = check
