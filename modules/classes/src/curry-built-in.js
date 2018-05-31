export const isElement = el => el instanceof Element

export const curryWith = (fn, enSureFunction, args = []) => (...subArgs) => {
  const index = subArgs.findIndex(enSureFunction)
  if (index >= 0) {
    const collect = args.concat(...subArgs.slice(0, index + 1))
    return fn(...collect)
  }
  const collect = args.concat(...subArgs)
  return curryWith(fn, enSureFunction, collect)
}
