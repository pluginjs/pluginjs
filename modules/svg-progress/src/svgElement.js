const SvgElement = (tag, attrs) => {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag)

  if (!attrs) {
    return elem
  }

  for (const key in attrs) {
    if (!Object.hasOwnProperty.call(attrs, key)) {
      continue
    }

    elem.setAttribute(key, attrs[key])
  }
  return elem
}

export default SvgElement
