export const resolveName = name => {
  name = name.trim()

  if (/^([\w\d]+)$/.test(name)) {
    return {
      at: name
    }
  } else if (/^([\w\d]+)\+$/.test(name)) {
    return {
      from: name.replace(/\+$/, '')
    }
  } else if (/^([\w\d]+)-$/.test(name)) {
    return {
      to: name.replace(/-$/, '')
    }
  } else if (/^([\w\d]+)-([\w\d]+)$/.test(name)) {
    return {
      from: name.replace(/-([\w\d]+)$/, ''),
      to: name.replace(/^([\w\d]+)-/, '')
    }
  }

  return {}
}

export const getName = obj => {
  const { at, from, to } = obj

  if (at) {
    return at
  }
  if (from && to) {
    return `${from}-${to}`
  }
  if (from) {
    return `${from}+`
  }
  if (to) {
    return `${to}-`
  }

  return null
}
