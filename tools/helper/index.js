const exportOptions = (options, target) => {
  return options.reduce((result, item) => {
    result[item] = target[item]
    return result
  }, {})
}

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const taggedTemplates = fn => (...args) => {
  const data = Array.isArray(args[0])
    ? args[0].reduce((result, str, index) => result + args[index] + str)
    : args[0]
  return fn(data)
}

const camelCase = taggedTemplates(str =>
  str.replace(/(-[a-z])/g, a => a[1].toUpperCase())
)

const hyphenate = taggedTemplates(str =>
  str.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
)

exports.exportOptions = exportOptions
exports.capitalizeFirstLetter = capitalizeFirstLetter
exports.hyphenate = hyphenate
exports.camelCase = camelCase
exports.taggedTemplates = taggedTemplates
