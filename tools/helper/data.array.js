const nub = arr =>
  arr.reduce((result, item) => {
    if (result.includes(item)) {
      return result
    }
    return [...result, item]
  }, [])
const nubWith = (fn, arr) =>
  arr.reduce((result, item) => {
    if (fn(result, item)) {
      return result
    }
    return [...result, item]
  }, [])

export { nub, nubWith }
