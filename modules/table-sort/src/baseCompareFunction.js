export const stringCompare = index => (currentElement, nextElement) => {
  const a = currentElement[index].textContent
  const b = nextElement[index].textContent
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }
  return 0
}

export const intCompare = index => (currentElement, nextElement) => {
  const a = currentElement[index].textContent
  const b = nextElement[index].textContent
  return parseInt(a, 10) - parseInt(b, 10)
}

export const floatCompare = index => (currentElement, nextElement) => {
  const a = currentElement[index].textContent
  const b = nextElement[index].textContent
  return parseFloat(a) - parseFloat(b)
}
