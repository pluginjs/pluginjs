const exportOptions = (options, target) => {
  return options.reduce((result, item) => {
    result[item] = target[item]
    return result
  }, {})
}

exports.exportOptions = exportOptions
