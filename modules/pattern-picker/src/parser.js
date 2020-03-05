export default function valueParser(originData) {
  const tokens = originData
    .replace('image/svg+xml,', 'image/svg+xml--')
    .replace(/(\\")/g, '"')
    .replace(/(",")/g, '"--"')
    .slice(1, -1)
    .split('--')
    .map(str => str.split(':'))
  const svgXmlIndex = tokens.findIndex(
    tokenTuple => tokenTuple[tokenTuple.length - 1] === 'image/svg+xml'
  )

  const svgPath = Array.of(
    tokens[svgXmlIndex].slice(1),
    tokens[svgXmlIndex + 1]
  )
    .map(strList => strList.join(':'))
    .join(',')
    .slice(1, -1)

  const key = tokens[svgXmlIndex][0].slice(1, -1)
  const result = tokens
    .filter((tuple, index) => index !== svgXmlIndex + 1)
    .map((tuple, index) => {
      if (index === svgXmlIndex) {
        return `${tuple[0]}: ""`
      }
      return tuple.join(':')
    })
    .join(',')
  return {
    ...JSON.parse(`{${result}}`),
    [key]: svgPath
  }
}
