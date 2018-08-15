export default {
  min(min, unit = 'px') {
    return `(min-width: ${min}${unit})`
  },
  max(max, unit = 'px') {
    return `(max-width: ${max}${unit})`
  },
  between(min, max, unit = 'px') {
    return `(min-width: ${min}${unit}) and (max-width: ${max}${unit})`
  },
  get(min, max, unit = 'px') {
    if (min === 0) {
      return this.max(max, unit)
    }
    if (max === Infinity) {
      return this.min(min, unit)
    }
    return this.between(min, max, unit)
  }
}
